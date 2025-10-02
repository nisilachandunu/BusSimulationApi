import Joi from "joi";

// Creation schema
export const routeValidationSchema = Joi.object({
  _id: Joi.string().trim().required(),            // route code like "01A"
  origin: Joi.string().required(),
  destination: Joi.string().required(),
  distanceKm: Joi.number().positive().required(),
  stops: Joi.array().items(Joi.string().hex().length(24)) // ObjectId strings
});

// Update schema: all fields optional
export const routeUpdateValidationSchema = routeValidationSchema.fork(
  ["_id", "origin", "destination", "distanceKm", "stops"],
  (field) => field.optional()
);
