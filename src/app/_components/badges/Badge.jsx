import styles from './badge.module.css';
const Badge = ({ badge, isUnlocked }) => {
	return (
		// FOR SAM: I added the checkbox and lower opacity for the locked badges like we discussed
		//feel free to change anything you need

		<div
			className={`${!isUnlocked ? styles.inactive : styles.active} ${styles.badge}`}
		>
			<img src={badge.img} alt={badge.name} className={styles.img} />
			<div className={styles.infos}>
				<h3 className={styles.title}>{badge.name}</h3>
				<p>{badge.description}</p>
				<p className={isUnlocked ? styles.unlocked : ""}>{isUnlocked ? 'Unlocked' : `XP needed: ${badge.xp_needed}`}</p>
			</div>
		</div>
	);
};

export default Badge;
