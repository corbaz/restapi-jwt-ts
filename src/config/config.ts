export default {
	jwtSecret: process.env.JWT_SECRET || "jcc123token",
	DB: {
		URI: process.env.MONGODB_URI || "mongodb://localhost/jwttutorial",
		USER: process.env.MONGODB_USER,
		PASSWORD: process.env.MONGODB_PASSWORD
	}
};