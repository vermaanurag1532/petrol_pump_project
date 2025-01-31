import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ExcelJS from "exceljs"; // For Excel file generation
import { FaFileExcel, FaFileWord, FaFilePdf } from "react-icons/fa"; // Icons for file types
import jsPDF from "jspdf"; // For PDF generation
import "jspdf-autotable"; // Required for autoTable functionality in jsPDF
import fileDownload from "js-file-download"; // For downloading Word files
import styles from "../../components/styles/PetrolPumpDetail.module.css"; // Importing custom styles

interface PetrolPump {
    petrolPumpID: string;
    Name: string;
    Location: string;
}

declare module "jspdf" {
    interface jsPDF {
        autoTable: (
            options: {
                head: string[][];
                body: string[][];
                startY?: number;
                theme?: string;
            }
        ) => jsPDF;
    }
}
interface IpoData {
    VehicleID: string;
    EnteringTime: string;
    ExitTime: string;
    FillingTime: string;
    Date: string;
}

const PetrolPumpDetail: React.FC = () => {
    const router = useRouter();
    const { id } = router.query; // Dynamic route parameter

    const [petrolPump, setPetrolPump] = useState<PetrolPump | null>(null);
    const [ipoData, setIpoData] = useState<IpoData[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            const fetchPetrolPumpDetails = async () => {
                try {
                    const response = await fetch(`http://localhost:3000/PetrolPumps/${id}`);
                    if (!response.ok) throw new Error("Failed to fetch petrol pump details");

                    const data: PetrolPump = await response.json();
                    setPetrolPump(data);
                } catch (err) {
                    setError((err as Error).message);
                } finally {
                    setLoading(false);
                }
            };

            fetchPetrolPumpDetails();
        }
    }, [id]);

    useEffect(() => {
        if (id) {
            const fetchIpoData = async () => {
                try {
                    const response = await fetch(`http://localhost:3000/PetrolPumps/detail/${id}`);
                    if (!response.ok) throw new Error("Failed to fetch IPO data");

                    const data: IpoData[] = await response.json();
                    if (data.length === 0) {
                        setMessage("Petrol Pump record not found.");
                        setIpoData(null);
                    } else {
                        setMessage(null);
                        setIpoData(data);
                    }
                } catch (err) {
                    setError((err as Error).message);
                }
            };

            fetchIpoData();
        }
    }, [id]);

    // Excel download function
    const downloadExcel = () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("IpoData");

        worksheet.columns = [
            { header: "Vehicle ID", key: "VehicleID" },
            { header: "Entering Time", key: "EnteringTime" },
            { header: "Exit Time", key: "ExitTime" },
            { header: "Filling Time", key: "FillingTime" },
            { header: "Date", key: "Date" },
        ];

        ipoData?.forEach((data) => {
            worksheet.addRow(data);
        });

        workbook.xlsx.writeBuffer().then((buffer) => {
            fileDownload(buffer, "ipo_data.xlsx");
        });
    };

    // Word download function
    const downloadWord = () => {
        let docContent = "<h1>Ipo Data</h1><table border='1'><tr><th>Vehicle ID</th><th>Entering Time</th><th>Exit Time</th><th>Filling Time</th><th>Date</th></tr>";
        ipoData?.forEach((data) => {
            docContent += `<tr><td>${data.VehicleID}</td><td>${data.EnteringTime}</td><td>${data.ExitTime}</td><td>${data.FillingTime}</td><td>${data.Date}</td></tr>`;
        });
        docContent += "</table>";

        const blob = new Blob([docContent], { type: "application/msword" });
        fileDownload(blob, "ipo_data.doc");
    };

// PDF download function
const downloadPDF = () => {
    const doc = new jsPDF();

    // Provide an empty array if ipoData is undefined
    doc.autoTable({
        head: [["Vehicle ID", "Entering Time", "Exit Time", "Filling Time", "Date"]],
        body: ipoData?.map((data) => [
            data.VehicleID,
            data.EnteringTime,
            data.ExitTime,
            data.FillingTime,
            data.Date,
        ]) || [],  // Fallback to empty array if ipoData is undefined
        startY: 30,
    });

    doc.save("ipo_data.pdf");
};

    if (loading) return <p>Loading petrol pump details...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.textContainer}>
                    <h1 className={styles.name}>{petrolPump?.Name}</h1>
                    <p className={styles.location}>{petrolPump?.Location}</p>
                </div>
                <div className={styles.iconsContainer}>
                    <FaFileExcel className={styles.iconExcel} onClick={downloadExcel} />
                    <FaFileWord className={styles.iconWord} onClick={downloadWord} />
                    <FaFilePdf className={styles.iconPdf} onClick={downloadPDF} />
                </div>
            </div>

            <div className={styles.details}>
                <p>Petrol Pump ID: {petrolPump?.petrolPumpID}</p>
            </div>

            {message && <p>{message}</p>}
            {ipoData && (
                <div className={styles.dataContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th className={styles.tableHeader}>Vehicle ID</th>
                                <th className={styles.tableHeader}>Entering Time</th>
                                <th className={styles.tableHeader}>Exit Time</th>
                                <th className={styles.tableHeader}>Filling Time</th>
                                <th className={styles.tableHeader}>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ipoData.map((data, index) => (
                                <tr key={index}>
                                    <td className={styles.tableCell}>{data.VehicleID}</td>
                                    <td className={styles.tableCell}>{data.EnteringTime}</td>
                                    <td className={styles.tableCell}>{data.ExitTime}</td>
                                    <td className={styles.tableCell}>{data.FillingTime}</td>
                                    <td className={styles.tableCell}>{data.Date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default PetrolPumpDetail;
