const validation = (schema) => {
    return (req, res, next) => {
        let validationErrors = [];
        
        if (req.method === 'PATCH') {
            const hasBody = Object.keys(req.body || {}).length > 0;
            const hasFile = !!req.file;

            if (!hasBody && !hasFile) {
                return res.status(400).json({ 
                    message: "Validation Error", 
                    error: "At least one field (body or file) must be provided for an update." 
                });
            }
        }

        for (const key of Object.keys(schema)) {
            const data = schema[key].validate(req[key], { abortEarly: false });
            if (data?.error) {
                validationErrors.push(...data.error.details);
            }
        }

        if (validationErrors.length) {
            return res.status(400).json({ error: validationErrors });
        }
         
        return next();
    };
};

module.exports = validation;