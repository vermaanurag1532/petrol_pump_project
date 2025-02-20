import requests
from datetime import datetime

BASE_URL = "http://localhost:3000/PetrolPumps/"

def post_vehicle_entry(petrol_pump_id, vehicle_id, entering_time, date):
    """
    Send vehicle entry data to the server.
    """
    url = f"{BASE_URL}detail/"
    data = {
        "petrolPumpID": petrol_pump_id,
        "vehicleID": vehicle_id,
        "enteringTime": entering_time,
        "exitTime": None,  # Exit time will be updated later
        "fillingTime": "0 mins",  # Placeholder, can be updated later
        "date": date
    }
    response = requests.post(url, json=data)
    if response.status_code == 200:
        print(f"Vehicle {vehicle_id} entry recorded successfully.")
    else:
        print(f"Failed to record vehicle {vehicle_id} entry. Error: {response.text}")

def update_vehicle_exit(petrol_pump_id, vehicle_id, exit_time, filling_time):
    """
    Update vehicle exit data on the server.
    """
    url = f"{BASE_URL}detail/{petrol_pump_id}/{vehicle_id}"
    data = {
        "exitTime": exit_time,
        "fillingTime": filling_time
    }
    response = requests.put(url, json=data)
    if response.status_code == 200:
        print(f"Vehicle {vehicle_id} exit updated successfully.")
    else:
        print(f"Failed to update vehicle {vehicle_id} exit. Error: {response.text}")