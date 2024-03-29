import React, {useEffect, useRef, useState} from 'react';

import Header from "../../components/Header/Header.jsx";
import HeaderText from "../../components/HeaderText/MK1/HeaderText.jsx";
import ProjectItem from "../../components/Containers/Demo/ProjectItem.jsx";

import projects from '../../utils/customJSON/projectsUpdated.json';
import loadout from '../../utils/demo-data/loadout.json';

import styles from "./ProjectsHome.module.scss";
import DialogDemo from "../../components/Dialog/DialogDemo.jsx";

import plusIcon from '../../icons/png/plus.png';
import ButtonText from "../../components/Buttons/ButtonText/ButtonText.jsx";

function ProjectsHome() {
    // Store the previous sumTotalDuration value
    const prevSumTotalDuration = useRef(null);
    // Store the sum of the total duration of each project
    const [loadoutCountSum, setLoadoutCountSum] = useState({});

    // Function that sums the total duration of each project
    function sumTotalDuration(data) {
        const result = {};

        data.forEach((item) => {
            if (result[item.Project_ID]) {
                result[item.Project_ID] += item.Total_Duration;
            } else {
                result[item.Project_ID] = item.Total_Duration;
            }
        });

        return result;
    }

    // Hook that runs when loadout changes to update the loadoutCountSum
    useEffect(() => {
        const sumTotalDurationValue = sumTotalDuration(loadout);

        // Only update loadoutCountSum when the sumTotalDuration changes
        if (prevSumTotalDuration.current !== sumTotalDurationValue) {
            setLoadoutCountSum(sumTotalDurationValue);
            // Update the previous value to the new one
            prevSumTotalDuration.current = sumTotalDurationValue;
        }
    }, [loadout]); // Run this hook only when loadout changes

    return (
        <>
            <Header/>

            <div className={styles.projects_home_container}>
                <div className={styles.header_text}>
                    <HeaderText
                        title="Projects"
                        subtitle="Here are displayed all your available projects"
                    />

                    <div className={styles.project_link}>
                        <ButtonText text={'Manage projects'} path={`construction`}/>
                    </div>
                </div>

                <div className={styles.grid_container}>
                    {projects.map(({Project_ID, Number_Of_Turbines, Project_Name}) => (
                        <div key={Project_ID} className={styles.grid_container_row}>
                            <ProjectItem loadoutCount={parseInt(loadoutCountSum[Project_ID]) || 0}
                                         projectID={Project_ID}
                                         turbinesCount={Number_Of_Turbines}
                                         projectName={Project_Name}/>
                        </div>
                    ))}
                    <div className={styles.grid_container_row}>
                        <DialogDemo title='Add project'
                                    description='Here you can add a new project to your list'
                                    labelOne={'Name'}
                                    labelTwo={'Others'}
                                    icon={plusIcon}
                                    buttonText={'Add project'}
                                    backgroundColor={'#fff'}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProjectsHome;
