const MountsList = ({ mounts }) => {
    return (
        <div className="MountsList-Container">
            {mounts.map((mount, idx) => 
                idx < 20 &&
                <div className="MountsList-Card" key={mount.mount_id}>
                    <p>{mount.mount_name}</p>
                </div>
            )}
        </div>
    );
};

export default MountsList;