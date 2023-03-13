import { Types } from "mongoose";
import { Email } from "@scheduler/common"

export const updateStatus = async (_id: Types.ObjectId, status) => {
  return Email.updateOne(
    {_id},
    { $set: { status } },
  );
};

export const findNewEmails = async () => Email.find({status: 'new'});
export const bulkStatusUpdate = async (ids: Types.ObjectId[], status) => Email.updateMany(
  { _id: { $in: ids } },
  { $set: { status } },
  { multi: true }
);
