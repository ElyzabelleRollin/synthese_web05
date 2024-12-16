import Primarybutton from '../primarybutton/primarybutton';
import styles from './404.module.css';

const NotFoundModule = () => {
	return (
		<div className={styles.notfound}>
			<div className={styles.content}>
				<h2 className={styles.title}>Page Not Found</h2>
				<p className={styles.text}>Could not find requested resource</p>
				<div className={styles.button}>
					<Primarybutton
						text="Go back to the homepage"
						iconleft="ArrowLeft"
						theme="dark"
						link="/"
					/>
				</div>
			</div>
		</div>
	);
};

export default NotFoundModule;
