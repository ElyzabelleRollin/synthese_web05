const Badge = ({ badge, isUnlocked }) => {
    return (

        // FOR SAM: I added the checkbox and lower opacity for the locked badges like we discussed
        //feel free to change anything you need

        <div className={`${!isUnlocked ? 'opacity-30' : 'opacity-100'} relative`}>
            <div >
                <input
                    type="checkbox"
                    checked={isUnlocked}
                    readOnly
                />
            </div>
            <img src={badge.img} width={50} height={50} alt={badge.name} />
            <h3>{badge.name}</h3>
            <p>{badge.description}</p>
            <p>XP needed: {badge.xp_needed}</p>
        </div>
    );
};

export default Badge;