/* eslint-disable @typescript-eslint/naming-convention */

import { STORAGE_BUCKET_NAME } from "../../../../configs/Configuration";


/**
 *
 * @returns policy bucket
 */
export default function getBucketPolicy(): string {
  const policy = {
    Version: "2012-10-17",
    Statement: [
      {
        Sid: "",
        Effect: "Allow",
        Principal: "*",
        Action: ["s3:GetBucketLocation"],
        Resource: [`arn:aws:s3:::${STORAGE_BUCKET_NAME}`],
      },
      {
        Sid: "",
        Effect: "Allow",
        Principal: "*",
        Action: ["s3:ListBucket"],
        Resource: [`arn:aws:s3:::${STORAGE_BUCKET_NAME}`],
        Condition: {
          StringEquals: {
            "s3:prefix": ["users/"],
          },
        },
      },
      {
        Sid: "",
        Effect: "Allow",
        Principal: "*",
        Action: ["s3:GetObject"],
        Resource: [
          `arn:aws:s3:::${STORAGE_BUCKET_NAME}/workspace/*`,
        ],
      },
    ],
  };
  return JSON.stringify(policy);
}
