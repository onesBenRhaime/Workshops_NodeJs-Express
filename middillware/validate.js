const yup = require("yup");
//allow function
const validate = async (req, res, next) => {
	try {
		const schema = yup.object().shape({
			name: yup.string().required(),
			email: yup
				.string()
				.matches([A - Z, a - z] + $)
				.email()
				.required(),
			cin: yup.number().required(),
		});
		await schema.validate(req.body);
		next();
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

module.exports = validate;
