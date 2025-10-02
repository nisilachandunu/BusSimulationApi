import Joi from "joi";

export const tripValidationSchema = Joi.object({
  routeId: Joi.string().trim().required(), // must match your Route._id
  busRegNo: Joi.string().trim().required(),
  departureTime: Joi.number().integer().min(0).max(1440).required(), // minutes in a day
  arrivalTime: Joi.number().integer().min(0).max(1440).greater(Joi.ref("departureTime")).required(),
  date: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/) // YYYY-MM-DD
    .required(),
  status: Joi.string()
    .valid("scheduled", "ongoing", "completed", "cancelled")
    .default("scheduled"),
});

// Update → optional but validated
export const tripUpdateValidationSchema = tripValidationSchema.fork(
  ["routeId", "busRegNo", "departureTime", "arrivalTime", "date", "status"],
  (field) => field.optional()
);
