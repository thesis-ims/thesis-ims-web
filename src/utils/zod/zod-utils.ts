import { FormDataErrorProps } from "@/interfaces/auth";
import { z, ZodIssue } from "zod";

export function getZodErrorMessage({
  path,
  errors,
}: {
  path: string;
  errors: FormDataErrorProps[];
}) {
  const errorMessages = errors.find((error) => {
    if (path === error.path) {
      return error.message;
    }
  });
  console.log(errorMessages);
  if (errorMessages) {
    return errorMessages.message;
  } else {
    return "";
  }
}

export function parseZodIssue(issues: ZodIssue[]) {
  const parsedIssues = issues.map((issue) => {
    return {
      path: issue.path[0] as string,
      message: issue.message,
    };
  });

  return parsedIssues;
}
