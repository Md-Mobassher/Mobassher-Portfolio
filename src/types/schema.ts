import z from "zod";

// ============================================================================
// ENUMS
// ============================================================================

/**
 * Publication Type Enum
 * Defines the different types of publications available in the system
 */
export const PublicationTypeEnum = z.enum([
  "JOURNAL",
  "BOOKS",
  "NEWSLETTER",
  "COMMENTARY",
  "REPORTS",
  "HANDBOOKS",
  "CONFERENCE_PAPER",
  "THESIS",
  "DISSERTATION",
  "WHITE_PAPER",
  "CASE_STUDY",
  "TECHNICAL_REPORT",
  "RESEARCH_ARTICLE",
  "REVIEW_ARTICLE",
  "MONOGRAPH",
  "PROCEEDINGS",
  "OTHER",
]);

export type PublicationType = z.infer<typeof PublicationTypeEnum>;

/**
 * Research Status Enum
 * Defines the status of research projects
 */
export const ResearchStatusEnum = z.enum(["ONGOING", "COMPLETED"]);

/**
 * Committee Role Enum
 * Defines the different roles available for committee members
 */
export const CommitteeRoleEnum = z.enum([
  "BOARD_DIRECTOR",
  "ADVISORY_BOARD",
  "RESEARCH_FELLOW",
  "OTHER",
]);

// ============================================================================
// DEPARTMENT SCHEMAS
// ============================================================================

/**
 * Department Create Schema
 * Schema for creating new departments
 */
export const createDepartmentFormSchema = z.object({
  name: z.string().min(1, "Department name is required"),
  description: z.string().optional(),
});

/**
 * Department Update Schema
 * Schema for updating existing departments
 */
export const updateDepartmentFormSchema = z.object({
  name: z.string().min(1, "Department name is required").optional(),
  description: z.string().optional(),
});

// ============================================================================
// TAG SCHEMAS
// ============================================================================

/**
 * Tag Create Schema
 * Schema for creating new tags
 */
export const createTagFormSchema = z.object({
  name: z.string().min(1, "Tag name is required"),
});

/**
 * Tag Update Schema
 * Schema for updating existing tags
 */
export const updateTagFormSchema = z.object({
  name: z.string().min(1, "Tag name is required").optional(),
});

// ============================================================================
// SLIDER SCHEMAS
// ============================================================================

/**
 * Slider Create Schema
 * Schema for creating new slider content
 */
export const createSliderFormSchema = z.object({
  title: z.string().optional(),
  slogan: z.string().optional(),
  description: z.string().optional(),
  order: z.number().int().min(0).optional(),
});

/**
 * Slider Update Schema
 * Schema for updating existing slider content
 */
export const updateSliderFormSchema = z.object({
  title: z.string().optional(),
  slogan: z.string().optional(),
  description: z.string().optional(),
  order: z.number().int().min(0).optional(),
});

// ============================================================================
// PUBLICATION SCHEMAS
// ============================================================================

/**
 * Publication Create Schema
 * Schema for creating new publications
 */
export const createPublicationFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  type: PublicationTypeEnum,
  content: z.string().optional(),
  fileUrl: z.string().optional(),
  publishDate: z.date({ required_error: "Publish date is required" }),
  authorId: z.string().optional(),
});

/**
 * Publication Update Schema
 * Schema for updating existing publications
 */
export const updatePublicationFormSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  type: PublicationTypeEnum.optional(),
  content: z.string().optional(),
  fileUrl: z.string().optional(),
  publishDate: z
    .date({ required_error: "Publish date is required" })
    .optional(),
  authorId: z.string().optional(),
});

// ============================================================================
// PROGRAM SCHEMAS
// ============================================================================

/**
 * Program Create Schema
 * Schema for creating new programs
 */
export const createProgramFormSchema = z.object({
  name: z.string().min(1, "Program name is required"),
  description: z.string().min(1, "Program description is required"),
  slug: z.string().optional(),
  type: z
    .enum([
      "PROPOSED_PROGRAM",
      "CORE_ACTIVITY",
      "TRAINING_PROGRAM",
      "CURRICULUM_PROJECT",
    ])
    .optional(),
  startDate: z.string().datetime("Invalid date format").or(z.date()).optional(),
  endDate: z.string().datetime("Invalid date format").or(z.date()).optional(),
  departmentId: z.string().optional(),
});

/**
 * Program Update Schema
 * Schema for updating existing programs
 */
export const updateProgramFormSchema = createProgramFormSchema.partial();

// ============================================================================
// EVENT SCHEMAS
// ============================================================================

/**
 * Event Create Schema
 * Schema for creating new events
 */
export const createEventFormSchema = z.object({
  title: z.string().min(1, "Event title is required"),
  description: z.string().optional(),
  slug: z.string().optional(),
  date: z.date({ required_error: "Event date is required" }),
  location: z.string().optional(),
  imageUrl: z.string().optional(),
  type: z.string().optional(),
  isUpcoming: z.boolean().default(true),
});

/**
 * Event Update Schema
 * Schema for updating existing events
 */
export const updateEventFormSchema = z.object({
  title: z.string().min(1, "Event title is required").optional(),
  description: z.string().optional(),
  slug: z.string().optional(),
  date: z.date({ required_error: "Event date is required" }).optional(),
  location: z.string().optional(),
  imageUrl: z.string().optional(),
  type: z.string().optional(),
  isUpcoming: z.boolean().optional(),
});

// ============================================================================
// PARTNER SCHEMAS
// ============================================================================

/**
 * Partner Create Schema
 * Schema for creating new partners
 */
export const createPartnerFormSchema = z.object({
  name: z.string().min(1, "Partner name is required"),
  logoUrl: z.string().optional(),
  url: z.string().url("Invalid URL format").optional().or(z.literal("")),
  description: z.string().optional(),
});

/**
 * Partner Update Schema
 * Schema for updating existing partners
 */
export const updatePartnerFormSchema = z.object({
  name: z.string().min(1, "Partner name is required").optional(),
  logoUrl: z.string().optional(),
  url: z.string().url("Invalid URL format").optional().or(z.literal("")),
  description: z.string().optional(),
});

// ============================================================================
// RESEARCH SCHEMAS
// ============================================================================

/**
 * Research Create Schema
 * Schema for creating new research projects
 */
export const createResearchFormSchema = z.object({
  title: z.string().min(1, "Research title is required"),
  description: z.string().optional(),
  status: ResearchStatusEnum.default("ONGOING"),
  startDate: z.date({ required_error: "Start date is required" }),
  endDate: z.date({ required_error: "End date is required" }),
  departmentId: z.string().optional(),
  fileUrl: z.string().optional(),
});

/**
 * Research Update Schema
 * Schema for updating existing research projects
 */
export const updateResearchFormSchema = z.object({
  title: z.string().min(1, "Research title is required").optional(),
  description: z.string().optional(),
  status: ResearchStatusEnum.optional(),
  startDate: z.date({ required_error: "Start date is required" }).optional(),
  endDate: z.date({ required_error: "End date is required" }).optional(),
  departmentId: z.string().optional(),
  fileUrl: z.string().optional(),
});

// ============================================================================
// COMMITTEE SCHEMAS
// ============================================================================

/**
 * Committee Create Schema
 * Schema for creating new committee members
 */
export const createCommitteeFormSchema = z.object({
  name: z.string().min(1, "Committee member name is required"),
  role: CommitteeRoleEnum.default("BOARD_DIRECTOR"),
  imageUrl: z.string().optional(),
  designation: z.string().optional(),
  department: z.string().optional(),
  companyName: z.string().optional(),
  bio: z.string().optional(),
});

/**
 * Committee Update Schema
 * Schema for updating existing committee members
 */
export const updateCommitteeFormSchema = z.object({
  name: z.string().optional(),
  role: CommitteeRoleEnum.optional(),
  imageUrl: z.string().optional(),
  designation: z.string().optional(),
  department: z.string().optional(),
  companyName: z.string().optional(),
  bio: z.string().optional(),
});

// ============================================================================
// CONTACT SCHEMAS
// ============================================================================

/**
 * Contact Create Schema
 * Schema for creating new contacts
 */
export const createContactFormSchema = z.object({
  name: z.string().min(1, "Contact name is required"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(11, "Phone number must be 11 digits")
    .max(14, "Phone number must be maximum 14 digits"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  inquiryType: z.enum(["CONTACT", "INQUIRY"]),
});

// ============================================================================
// VIDEO SCHEMAS
// ============================================================================

/**
 * Video Create Schema
 * Schema for creating new videos
 */
export const createVideoFormSchema = z.object({
  title: z.string().min(1, "Video title is required"),
  videoUrl: z.string().url("Invalid video URL").min(1, "Video URL is required"),
  order: z.number().optional(),
});

/**
 * Video Update Schema
 * Schema for updating existing videos
 */
export const updateVideoFormSchema = z.object({
  title: z.string().optional(),
  videoUrl: z.string().url("Invalid video URL").optional(),
  order: z.number().optional(),
});
// ============================================================================
// AUTHOR SCHEMAS
// ============================================================================

/**
 * Author Create Schema
 * Schema for creating new authors
 */
export const createAuthorFormSchema = z.object({
  name: z.string().min(1, "Author name is required"),
  email: z.string().optional(),
  phone: z.string().optional(),
  designation: z.string().optional(),
  bio: z.string().optional(),
});

/**
 * Author Update Schema
 * Schema for updating existing authors
 */
export const updateAuthorFormSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  designation: z.string().optional(),
  bio: z.string().optional(),
});

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

// Department Types
export type CreateFormData = z.infer<typeof createDepartmentFormSchema>;
export type UpdateFormData = z.infer<typeof updateDepartmentFormSchema>;
export type DepartmentFormData = CreateFormData | UpdateFormData;

// Tag Types
export type CreateTagFormData = z.infer<typeof createTagFormSchema>;
export type UpdateTagFormData = z.infer<typeof updateTagFormSchema>;
export type TagFormData = CreateTagFormData | UpdateTagFormData;

// Slider Types
export type CreateSliderFormData = z.infer<typeof createSliderFormSchema>;
export type UpdateSliderFormData = z.infer<typeof updateSliderFormSchema>;
export type SliderFormData = CreateSliderFormData | UpdateSliderFormData;

// Publication Types
export type CreatePublicationFormData = z.infer<
  typeof createPublicationFormSchema
>;
export type UpdatePublicationFormData = z.infer<
  typeof updatePublicationFormSchema
>;
export type PublicationFormData =
  | CreatePublicationFormData
  | UpdatePublicationFormData;

// Program Types
export type CreateProgramFormData = z.infer<typeof createProgramFormSchema>;
export type UpdateProgramFormData = z.infer<typeof updateProgramFormSchema>;
export type ProgramFormData = CreateProgramFormData | UpdateProgramFormData;

// Event Types
export type CreateEventFormData = z.infer<typeof createEventFormSchema>;
export type UpdateEventFormData = z.infer<typeof updateEventFormSchema>;
export type EventFormData = CreateEventFormData | UpdateEventFormData;

// Partner Types
export type CreatePartnerFormData = z.infer<typeof createPartnerFormSchema>;
export type UpdatePartnerFormData = z.infer<typeof updatePartnerFormSchema>;
export type PartnerFormData = CreatePartnerFormData | UpdatePartnerFormData;

// Research Types
export type CreateResearchFormData = z.infer<typeof createResearchFormSchema>;
export type UpdateResearchFormData = z.infer<typeof updateResearchFormSchema>;
export type ResearchFormData = CreateResearchFormData | UpdateResearchFormData;

// Committee Types
export type CreateCommitteeFormData = z.infer<typeof createCommitteeFormSchema>;
export type UpdateCommitteeFormData = z.infer<typeof updateCommitteeFormSchema>;
export type CommitteeFormData =
  | CreateCommitteeFormData
  | UpdateCommitteeFormData;

// contact Types
export type CreateContactFormData = z.infer<typeof createContactFormSchema>;

// Video Types
export type CreateVideoFormData = z.infer<typeof createVideoFormSchema>;
export type UpdateVideoFormData = z.infer<typeof updateVideoFormSchema>;
export type VideoFormData = CreateVideoFormData | UpdateVideoFormData;
// Video Types
export type CreateAuthorFormData = z.infer<typeof createAuthorFormSchema>;
export type UpdateAuthorFormData = z.infer<typeof updateAuthorFormSchema>;
export type AuthorFormData = CreateAuthorFormData | UpdateAuthorFormData;
