import { CreateCourseResponse } from "../create-course-usecase/create-course.response";
import { IResponse } from "../itf.response";

export class UpdateCourseResponse extends CreateCourseResponse implements IResponse {}