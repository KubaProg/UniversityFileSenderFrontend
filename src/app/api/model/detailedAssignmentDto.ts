/**
 * Api Documentation
 * Api Documentation
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { StudentAssignmentRelationshipDto } from './studentAssignmentRelationshipDto';


export interface DetailedAssignmentDto { 
    assignmentName?: string;
    deadlineDate?: string;
    description?: string;
    id?: number;
    studentAssignmentRelationships?: Array<StudentAssignmentRelationshipDto>;
}
