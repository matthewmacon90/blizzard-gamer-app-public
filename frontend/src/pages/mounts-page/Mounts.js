import MountsList from "./mounts-components/MountsList";
import { useEffect, useState } from "react";
import Api from "../../api";
import './MountsStyles.css';

const Mounts = () => {
    const [mounts, setMounts] = useState([]);

    useEffect(() => {
        async function fetchMounts () {
            try {
                const result = await Api.getMounts();
                setMounts(result);
            } catch (err) {
                console.error('ERROR FETCHING MOUNTS: ', err);
            }
        }
        fetchMounts();
    },[])

    return (
        <div className='Mounts-Container'>
            <h1>Mounts</h1>
            <MountsList mounts={mounts} />
        </div>
    );
}; 

export default Mounts;