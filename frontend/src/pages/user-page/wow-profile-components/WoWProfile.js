import WoWCharacters from "./WoWCharacters";
import {useState, useEffect } from "react";
import {checkTokenDate} from "../../../utility/checkTokenDate";

const WoWProfile = ({user, setUser}) => {
    const [isExpired, setIsExpired] = useState(false);

    useEffect(() => {
        if(!user.btoken) return;
        const istokenExpired = checkTokenDate(user.bTokenExpires);
        if(!istokenExpired) return;
        setIsExpired(!isExpired);
    }, [user.bTokenExpires]);

    return (
        <div>
            {user.battletag && <WoWCharacters isExpired={isExpired} user={user} setUser={setUser} />}
        </div>
    );
};

export default WoWProfile;
