import numpy as np
from scipy.optimize import linear_sum_assignment
from filterpy.kalman import KalmanFilter

class KalmanBoxTracker:
    count = 0

    def __init__(self, bbox):
        self.kf = KalmanFilter(dim_x=7, dim_z=4)
        self.kf.F = np.eye(7)
        self.kf.F[0:4, 4:7] = np.eye(4)[:, :3]
        self.kf.H = np.eye(4, 7)
        self.kf.R[2:, 2:] *= 10.0
        self.kf.P[4:, 4:] *= 1000.0
        self.kf.P *= 10.0
        self.kf.Q[-1, -1] *= 0.01
        self.kf.Q[4:, 4:] *= 0.01
        self.kf.x[:4] = np.array(bbox).reshape(-1, 1)
        self.id = KalmanBoxTracker.count
        KalmanBoxTracker.count += 1
        self.time_since_update = 0
        self.hits = 0
        self.hit_streak = 0
        self.age = 0

    def update(self, bbox):
        self.time_since_update = 0
        self.hits += 1
        self.hit_streak += 1
        self.kf.update(bbox)

    def predict(self):
        if (self.kf.x[6] + self.kf.x[2]) <= 0:
            self.kf.x[6] *= 0.0
        self.kf.predict()
        self.age += 1
        if self.time_since_update > 0:
            self.hit_streak = 0
        self.time_since_update += 1
        return self.kf.x[:4]

    def get_state(self):
        return self.kf.x[:4]

class Sort:
    def __init__(self, max_age=1, min_hits=3, iou_threshold=0.3):
        self.max_age = max_age
        self.min_hits = min_hits
        self.iou_threshold = iou_threshold
        self.trackers = []
        self.frame_count = 0

    def update(self, dets):
        self.frame_count += 1
        
        # Return empty array if no detections
        if len(dets) == 0:
            return np.empty((0, 5))

        trks = np.zeros((len(self.trackers), 5))
        to_del = []
        
        # Update existing trackers
        for t, trk in enumerate(self.trackers):
            pos = trk.predict()
            # Convert from KF state to bounding box format
            pos = pos.reshape(-1)  # Ensure pos is 1D
            trks[t, :] = [pos[0], pos[1], pos[2], pos[3], 0]
            
        # Get predicted locations from existing trackers
        matched, unmatched_dets, unmatched_trks = self._associate_detections_to_trackers(dets, trks)
        
        # Update matched trackers with assigned detections
        for m in matched:
            self.trackers[m[1]].update(dets[m[0], :])

        # Create and initialize new trackers for unmatched detections
        for i in unmatched_dets:
            trk = KalmanBoxTracker(dets[i, :])
            self.trackers.append(trk)

        # Remove dead tracklets
        i = len(self.trackers)
        for trk in reversed(self.trackers):
            if trk.time_since_update > self.max_age:
                self.trackers.pop(i-1)
            i -= 1

        # Return valid tracks
        ret = []
        for trk in self.trackers:
            pos = trk.get_state().reshape(-1)[:4]  # Get first 4 elements of state
            ret.append(np.concatenate((pos, [trk.id])))
        return np.array(ret) if ret else np.empty((0, 5))

    def _associate_detections_to_trackers(self, detections, trackers, iou_threshold=0.3):
        """
        Assigns detections to tracked object (both represented as bounding boxes)
        Returns 3 lists of matches, unmatched_detections and unmatched_trackers
        """
        if len(trackers) == 0:
            return np.empty((0, 2), dtype=int), np.arange(len(detections)), np.empty((0, 5), dtype=int)
        
        if len(detections) == 0:
            return np.empty((0, 2), dtype=int), np.empty((0, 5), dtype=int), np.arange(len(trackers))

        iou_matrix = np.zeros((len(detections), len(trackers)), dtype=np.float32)
        for d, det in enumerate(detections):
            for t, trk in enumerate(trackers):
                iou_matrix[d, t] = self._iou(det, trk)

        # Hungarian Algorithm assignment
        matched_indices = linear_sum_assignment(-iou_matrix)
        matched_indices = np.array(list(zip(*matched_indices)))

        unmatched_detections = []
        for d, det in enumerate(detections):
            if d not in matched_indices[:, 0]:
                unmatched_detections.append(d)

        unmatched_trackers = []
        for t, trk in enumerate(trackers):
            if t not in matched_indices[:, 1]:
                unmatched_trackers.append(t)

        # Filter out matched with low IOU
        matches = []
        for m in matched_indices:
            if iou_matrix[m[0], m[1]] < iou_threshold:
                unmatched_detections.append(m[0])
                unmatched_trackers.append(m[1])
            else:
                matches.append(m)

        return np.array(matches), np.array(unmatched_detections), np.array(unmatched_trackers)

    def _iou(self, bb_test, bb_gt):
        """
        Computes IOU between two bounding boxes
        """
        xx1 = np.maximum(bb_test[0], bb_gt[0])
        yy1 = np.maximum(bb_test[1], bb_gt[1])
        xx2 = np.minimum(bb_test[2], bb_gt[2])
        yy2 = np.minimum(bb_test[3], bb_gt[3])
        
        w = np.maximum(0., xx2 - xx1)
        h = np.maximum(0., yy2 - yy1)
        intersection = w * h
        
        area1 = (bb_test[2] - bb_test[0]) * (bb_test[3] - bb_test[1])
        area2 = (bb_gt[2] - bb_gt[0]) * (bb_gt[3] - bb_gt[1])
        
        union = area1 + area2 - intersection
        
        return intersection / union if union > 0 else 0