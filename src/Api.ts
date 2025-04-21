/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** Body_login_for_access_token_api_v1_token_post */
export interface BodyLoginForAccessTokenApiV1TokenPost {
  /** Grant Type */
  grant_type?: string | null;
  /** Username */
  username: string;
  /** Password */
  password: string;
  /**
   * Scope
   * @default ""
   */
  scope?: string;
  /** Client Id */
  client_id?: string | null;
  /** Client Secret */
  client_secret?: string | null;
}

/** CommentCreate */
export interface CommentCreate {
  /** Content */
  content: string;
}

/** CommentInDB */
export interface CommentInDB {
  /** Content */
  content: string;
  /** Id */
  id: number;
  /** Post Id */
  post_id: number;
  /** Owner Id */
  owner_id: number;
  /**
   * Created At
   * @format date-time
   */
  created_at: string;
}

/** CommentResponse */
export interface CommentResponse {
  /** Content */
  content: string;
  /** Id */
  id: number;
  /** Post Id */
  post_id: number;
  /** Owner Id */
  owner_id: number;
  /**
   * Created At
   * @format date-time
   */
  created_at: string;
  /** Owner Username */
  owner_username?: string | null;
}

/** CommentUpdate */
export interface CommentUpdate {
  /** Content */
  content?: string | null;
}

/** HTTPValidationError */
export interface HTTPValidationError {
  /** Detail */
  detail?: ValidationError[];
}

/** PostCreate */
export interface PostCreate {
  /** Title */
  title: string;
  /** Content */
  content: string;
  /** Tags */
  tags?: string | null;
  /**
   * Post Status
   * @default "draft"
   */
  post_status?: string | null;
  /** Image Base64 */
  image_base64?: string | null;
}

/** PostModerationUpdate */
export interface PostModerationUpdate {
  /** Approval Status */
  approval_status: "approved" | "rejected";
}

/** PostResponse */
export interface PostResponse {
  /** Title */
  title: string;
  /** Content */
  content: string;
  /** Tags */
  tags?: string | null;
  /** Post Status */
  post_status: string;
  /** Image Base64 */
  image_base64?: string | null;
  /** Id */
  id: number;
  /** Owner Id */
  owner_id: number;
  /**
   * Created At
   * @format date-time
   */
  created_at: string;
  /** Approved At */
  approved_at?: string | null;
  /** Approval Status */
  approval_status: string;
  /** Image Url */
  image_url?: string | null;
}

/** PostUpdate */
export interface PostUpdate {
  /** Title */
  title: string;
  /** Content */
  content: string;
  /** Tags */
  tags?: string | null;
  /** Post Status */
  post_status?: string | null;
  /** Image Base64 */
  image_base64?: string | null;
  /** Approval Status */
  approval_status?: string | null;
}

/** UserCreate */
export interface UserCreate {
  /** Username */
  username: string;
  /**
   * Email
   * @format email
   */
  email: string;
  /** Password */
  password: string;
}

/** UserProfileCreate */
export interface UserProfileCreate {
  /** Bio */
  bio?: string | null;
  /** Interests */
  interests?: string | null;
  /** Location */
  location?: string | null;
  /** Avatar Base64 */
  avatar_base64?: string | null;
}

/** UserProfileOut */
export interface UserProfileOut {
  /** Bio */
  bio?: string | null;
  /** Interests */
  interests?: string | null;
  /** Location */
  location?: string | null;
  /** Id */
  id: number;
  /** User Id */
  user_id: number;
  /** Avatar Url */
  avatar_url?: string | null;
}

/** UserProfileUpdate */
export interface UserProfileUpdate {
  /** Bio */
  bio?: string | null;
  /** Interests */
  interests?: string | null;
  /** Location */
  location?: string | null;
  /** Avatar Url */
  avatar_url?: string | null;
}

/** UserResponse */
export interface UserResponse {
  /** Id */
  id: number;
  /** Username */
  username: string;
  /** Email */
  email: string;
  /** Role */
  role: string;
}

/** ValidationError */
export interface ValidationError {
  /** Location */
  loc: (string | number)[];
  /** Message */
  msg: string;
  /** Error Type */
  type: string;
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "",
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === "object"
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== "string"
    ) {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title FastAPI Backend
 * @version 1.0.0
 *
 * Backend с авторизацией Bearer Token
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags auth
     * @name LoginForAccessTokenApiV1TokenPost
     * @summary Login For Access Token
     * @request POST:/api/v1/token
     */
    loginForAccessTokenApiV1TokenPost: (
      data: BodyLoginForAccessTokenApiV1TokenPost,
      params: RequestParams = {},
    ) =>
      this.request<any, HTTPValidationError>({
        path: `/api/v1/token`,
        method: "POST",
        body: data,
        type: ContentType.UrlEncoded,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name RegisterUserApiV1UsersPost
     * @summary Register User
     * @request POST:/api/v1/users/
     */
    registerUserApiV1UsersPost: (
      data: UserCreate,
      params: RequestParams = {},
    ) =>
      this.request<UserResponse, HTTPValidationError>({
        path: `/api/v1/users/`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags posts
     * @name CreatePostApiV1PostsPost
     * @summary Create Post
     * @request POST:/api/v1/posts/
     * @secure
     */
    createPostApiV1PostsPost: (data: PostCreate, params: RequestParams = {}) =>
      this.request<PostResponse, HTTPValidationError>({
        path: `/api/v1/posts/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags posts
     * @name GetAllPostsApiV1PostsGet
     * @summary Get All Posts
     * @request GET:/api/v1/posts/
     */
    getAllPostsApiV1PostsGet: (
      query?: {
        /** Approval Status */
        approval_status?: string | null;
        /** Post Status */
        post_status?: string | null;
        /** Owner Id */
        owner_id?: number | null;
        /** Title */
        title?: string | null;
      },
      params: RequestParams = {},
    ) =>
      this.request<PostResponse[], HTTPValidationError>({
        path: `/api/v1/posts/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags posts
     * @name GetMyPostsApiV1PostsMyGet
     * @summary Get My Posts
     * @request GET:/api/v1/posts/my
     * @secure
     */
    getMyPostsApiV1PostsMyGet: (params: RequestParams = {}) =>
      this.request<PostResponse[], any>({
        path: `/api/v1/posts/my`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags posts
     * @name GetPostApiV1PostsPostIdGet
     * @summary Get Post
     * @request GET:/api/v1/posts/{post_id}
     */
    getPostApiV1PostsPostIdGet: (postId: number, params: RequestParams = {}) =>
      this.request<PostResponse, HTTPValidationError>({
        path: `/api/v1/posts/${postId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags posts
     * @name UpdatePostApiV1PostsPostIdPut
     * @summary Update Post
     * @request PUT:/api/v1/posts/{post_id}
     * @secure
     */
    updatePostApiV1PostsPostIdPut: (
      postId: number,
      data: PostUpdate,
      params: RequestParams = {},
    ) =>
      this.request<PostResponse, HTTPValidationError>({
        path: `/api/v1/posts/${postId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags posts
     * @name DeletePostApiV1PostsPostIdDelete
     * @summary Delete Post
     * @request DELETE:/api/v1/posts/{post_id}
     * @secure
     */
    deletePostApiV1PostsPostIdDelete: (
      postId: number,
      params: RequestParams = {},
    ) =>
      this.request<any, HTTPValidationError>({
        path: `/api/v1/posts/${postId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags posts
     * @name ModeratePostApiV1PostsModeratePostIdPatch
     * @summary Moderate Post
     * @request PATCH:/api/v1/posts/moderate/{post_id}
     * @secure
     */
    moderatePostApiV1PostsModeratePostIdPatch: (
      postId: number,
      data: PostModerationUpdate,
      params: RequestParams = {},
    ) =>
      this.request<PostResponse, HTTPValidationError>({
        path: `/api/v1/posts/moderate/${postId}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags posts
     * @name SearchApiV1PostsSearchPostGet
     * @summary Search
     * @request GET:/api/v1/posts/search/post
     */
    searchApiV1PostsSearchPostGet: (
      query: {
        /** Query */
        query: string;
        /** Approval Status */
        approval_status?: "pending" | "approved" | "rejected";
        /** Post Status */
        post_status?: "draft" | "published" | "archived";
        /** Tags */
        tags?: string | null;
      },
      params: RequestParams = {},
    ) =>
      this.request<PostResponse[], HTTPValidationError>({
        path: `/api/v1/posts/search/post`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags comments
     * @name CreateCommentApiV1CommentsPost
     * @summary Create Comment
     * @request POST:/api/v1/comments/
     * @secure
     */
    createCommentApiV1CommentsPost: (
      query: {
        /** Post Id */
        post_id: number;
      },
      data: CommentCreate,
      params: RequestParams = {},
    ) =>
      this.request<CommentInDB, HTTPValidationError>({
        path: `/api/v1/comments/`,
        method: "POST",
        query: query,
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags comments
     * @name GetCommentsForPostApiV1CommentsPostsPostIdGet
     * @summary Get Comments For Post
     * @request GET:/api/v1/comments/posts/{post_id}/
     */
    getCommentsForPostApiV1CommentsPostsPostIdGet: (
      postId: number,
      query?: {
        /**
         * Skip
         * @default 0
         */
        skip?: number;
        /**
         * Limit
         * @default 100
         */
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<CommentResponse[], HTTPValidationError>({
        path: `/api/v1/comments/posts/${postId}/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags comments
     * @name GetCommentApiV1CommentsCommentIdGet
     * @summary Get Comment
     * @request GET:/api/v1/comments/{comment_id}
     */
    getCommentApiV1CommentsCommentIdGet: (
      commentId: number,
      params: RequestParams = {},
    ) =>
      this.request<CommentInDB, HTTPValidationError>({
        path: `/api/v1/comments/${commentId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags comments
     * @name UpdateCommentApiV1CommentsCommentIdPut
     * @summary Update Comment
     * @request PUT:/api/v1/comments/{comment_id}
     * @secure
     */
    updateCommentApiV1CommentsCommentIdPut: (
      commentId: number,
      data: CommentUpdate,
      params: RequestParams = {},
    ) =>
      this.request<CommentInDB, HTTPValidationError>({
        path: `/api/v1/comments/${commentId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags comments
     * @name DeleteCommentApiV1CommentsCommentIdDelete
     * @summary Delete Comment
     * @request DELETE:/api/v1/comments/{comment_id}
     * @secure
     */
    deleteCommentApiV1CommentsCommentIdDelete: (
      commentId: number,
      params: RequestParams = {},
    ) =>
      this.request<CommentInDB, HTTPValidationError>({
        path: `/api/v1/comments/${commentId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user_profile, UserProfile
     * @name GetMyProfileApiV1UserProfileProfilesMeGet
     * @summary Get My Profile
     * @request GET:/api/v1/user_profile/profiles/me
     * @secure
     */
    getMyProfileApiV1UserProfileProfilesMeGet: (params: RequestParams = {}) =>
      this.request<UserProfileOut, any>({
        path: `/api/v1/user_profile/profiles/me`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user_profile, UserProfile
     * @name UpdateProfileApiV1UserProfileProfilesPut
     * @summary Update Profile
     * @request PUT:/api/v1/user_profile/profiles/
     * @secure
     */
    updateProfileApiV1UserProfileProfilesPut: (
      data: UserProfileUpdate,
      params: RequestParams = {},
    ) =>
      this.request<UserProfileOut, HTTPValidationError>({
        path: `/api/v1/user_profile/profiles/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user_profile, UserProfile
     * @name CreateProfileApiV1UserProfileProfilesPost
     * @summary Create Profile
     * @request POST:/api/v1/user_profile/profiles/
     * @secure
     */
    createProfileApiV1UserProfileProfilesPost: (
      data: UserProfileCreate,
      params: RequestParams = {},
    ) =>
      this.request<UserProfileOut, HTTPValidationError>({
        path: `/api/v1/user_profile/profiles/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user_profile, UserProfile
     * @name DeleteProfileApiV1UserProfileProfilesDelete
     * @summary Delete Profile
     * @request DELETE:/api/v1/user_profile/profiles/
     * @secure
     */
    deleteProfileApiV1UserProfileProfilesDelete: (params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/api/v1/user_profile/profiles/`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),
  };
}
