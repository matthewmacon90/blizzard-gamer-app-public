import { useState } from "react";
import Api from "../../../api";

const MountsList = ({ mounts }) => {
    const [mountData, setMountData] = useState({});

    async function fetchMountData(mountId) {
        try {
            const result = await Api.getMountData(mountId);
            setMountData(result);
        } catch (err) {
        }
    }

    const handleClick = (mountId) => {
        fetchMountData(mountId);
    };

    return (
        <div className="MountsList-Container">
            {mounts.map((mount, idx) => 
                idx < 20 &&
                <div onClick={() => handleClick(mount.mount_id)} className="MountsList-Card" key={mount.mount_id}>
                    <p>{mount.mount_name}</p>
                    <p>{mountData.mount_id === mount.mount_id ? mountData.mount_description : null}</p>
                    <p>{mountData.mount_id === mount.mount_id ? `Faction: ${mountData.mount_faction}` : null}</p>
                    <p>{mountData.mount_id === mount.mount_id ? `Obtained From: ${mountData.mount_source}` : null}</p>
                    {mountData.mount_id === mount.mount_id ? <img className="mount-image" src={mountData.mount_id === mount.mount_id ? mountData.image_url : null} alt="mount" /> : null}
                </div>
            )}
        </div>
    );
};

export default MountsList;