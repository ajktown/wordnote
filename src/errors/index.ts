interface PrivateProps {
  statusCode: number // 200, 401, 403,
  statusMessage: string // "Unauthorized"
  name: string // "UnauthorizedException"
}
export class CustomizedApiError {
  readonly props: PrivateProps

  private constructor(props: PrivateProps) {
    this.props = props
  }

  static getDefault(): CustomizedApiError {
    return new CustomizedApiError({
      statusCode: 500,
      statusMessage: `Internal Server Error`,
      name: `InternalServerErrorException`,
    })
  }

  static fromUnknown(err: any): CustomizedApiError {
    // Only accepts Nest JS Error at this point
    if (typeof err !== `object` && !err) {
      return this.getDefault()
    }
    if (err[`status`] && err[`message`] && err[`name`]) {
      return new CustomizedApiError({
        statusCode: err.status,
        statusMessage: err.message,
        name: err.name,
      })
    }
    return this.getDefault()
  }
}
