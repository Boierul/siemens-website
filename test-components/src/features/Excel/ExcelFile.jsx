import React, {useEffect, useState} from "react";
import * as XLSX from "xlsx";
import ButtonText from "../../components/Buttons/ButtonText/ButtonText.jsx";
import ButtonOutline from "../../components/Buttons/ButtonOutline/ButtonOutline.jsx";

function ExcelFile({commissioningData, installationData, serviceData}) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Check if window is mobile
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth < 960);
        }

        // Call checkIsMobile initially and on window resize
        checkIsMobile();
        window.addEventListener('resize', checkIsMobile);

        // Remove event listener on cleanup
        return () => window.removeEventListener('resize', checkIsMobile);
    }, []);



    // Check if data is an array or object and convert to worksheet
    function comparePropsArray(inputData) {
        let outputWorksheet;
        if (Array.isArray(inputData)) {
            outputWorksheet = XLSX.utils.json_to_sheet(inputData);
        } else {
            outputWorksheet = XLSX.utils.json_to_sheet([inputData]);
        }
        return outputWorksheet;
    }

    const handleExport = () => {
        // Create workbook for export
        const workbook = XLSX.utils.book_new();

        /*----------------------------------------------------------------------------------*/

        // Add Commissioning Report worksheet
        let commissioningWorksheet = comparePropsArray(commissioningData);

        // Add worksheet to workbook
        XLSX.utils.book_append_sheet(
            workbook,
            commissioningWorksheet,
            "Commissioning_Report"
        );

        /*----------------------------------------------------------------------------------*/

        // Add Installation Report worksheet
        let installationWorksheet = comparePropsArray(installationData);

        // Add worksheet to workbook
        XLSX.utils.book_append_sheet(
            workbook,
            installationWorksheet,
            "Installation Report"
        );

        /*----------------------------------------------------------------------------------*/

        // Add Service Report worksheet
        let serviceWorksheet = comparePropsArray(serviceData);

        // Add worksheet to workbook
        XLSX.utils.book_append_sheet(
            workbook,
            serviceWorksheet,
            "Service Report"
        );

        /*----------------------------------------------------------------------------------*/

        // Export workbook
        XLSX.writeFile(workbook, "turbines_reports.xlsx");
    };

    return (
        <div onClick={handleExport}>
            {isMobile ? <ButtonOutline text="Download reports" fontSize='15px' path='none'/>
                : <ButtonText text="Download reports" fontSize='15px' path='none'/>}
        </div>
    );
}

export default ExcelFile;
