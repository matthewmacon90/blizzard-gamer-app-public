import wowClasses from '../../../../../data/wow-data/wowClasses';

const WoWClassCard = () => {
    console.log(wowClasses);
    return (
        <>
            {wowClasses.map((wowClass) => ( 
                    <div className="wowhead-class-card" key={wowClass.id}>
                        <div className='wowhead-card-top'>
                            <h2>{wowClass.className}</h2>
                        </div>
                        <div className='wowhead-card-bottom'>
                            <p className='wowhead-card-class-info'>{wowClass.classInfo}</p>
                            <div className='wowhead-card-link-container'>
                                {wowClass.playableSpecs.map((spec) => (
                                    <a className='wowhead-card-class-links' target='_blank' href={spec.classGuide}>{spec.specName}</a>
                                ))}
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    )
};

export default WoWClassCard;