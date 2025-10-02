import Joi from "joi";

export const stopValidationSchema = Joi.object({
  name: Joi.string().trim().required(),
  lat: Joi.number().min(-90).max(90).required(),
  lon: Joi.number().min(-180).max(180).required(),
});

// For updating → make everything optional
export const stopUpdateValidationSchema = stopValidationSchema.fork(
  ["name", "lat", "lon"],
  (field) => field.optional()
);
