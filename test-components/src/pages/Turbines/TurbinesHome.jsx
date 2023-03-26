import React from 'react';
import Header from "../../components/Header/Header.jsx";
import HeaderTextMK2 from "../../components/HeaderText/MK2/HeaderTextMK2.jsx";

import styles from './TurbinesHome.module.scss';
import TurbineLabel from "../../components/TurbineLabel/TurbineLabel.jsx";
import DialogDemo from "../../components/Dialog/DialogDemo.jsx";
import plusIcon from "../../icons/png/plus-inverted.png";
import TurbineDemo from "../../components/TurbineDemo/TurbineDemo.jsx";

function TurbinesHome({projectId, projectName, turbineList}) {
    // Limit the number of turbines to 10 to display
    const reduceList = turbineList.slice(0, 11);

    return (
        <>
            <Header/>

            <div className={styles.turbines_container}>
                <div className={styles.header_text}>
                    <HeaderTextMK2 title={`${projectName}`}
                                   subtitle="Here are displayed all the data related to your turbines"
                                   projectId={projectId}
                    />
                </div>

                <div className={styles.turbines_grid_container}>
                    {reduceList.map((turbine) => {
                        return (
                            <TurbineLabel turbineName={turbine.Turbine_ID} projectId={projectId} projectName={projectName}/>
                        )
                    })}
                    <div className={styles.turbine_grid_container_row}>
                        <DialogDemo title='Add turbine'
                                    description='Here you can add a new turbine to your list'
                                    labelOne={'Name'}
                                    labelTwo={'Others'}
                                    icon={plusIcon}
                                    buttonText={'Add turbine'}
                                    backgroundColor={'#000'}
                        />
                    </div>
                </div>

                <div className={styles.turbines_home_grid}>
                    <div className={styles.turbines_home_row_alternative} style={{
                        gridColumn: 'span 12',
                        borderRadius: '10px',
                        backgroundImage: 'linear-gradient(#C6E4EE 0%, #C6E4EE 40%, #FED1AE 60%, #FAA0B9 70%, #CB7DCB 80%, #757ECB 100%)',
                        border: '1px solid #e0e0e0',
                        boxShadow: "0 2px 10px var(--blackA7)"
                    }}>
                        <TurbineDemo/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TurbinesHome;