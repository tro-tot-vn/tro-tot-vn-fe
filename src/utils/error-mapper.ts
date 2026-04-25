/**
 * Maps Backend Static Error Codes to User-Friendly Vietnamese Messages
 */
export const ERROR_MESSAGES: Record<string, string> = {
  // Auth Errors
  'USER_ALREADY_EXISTS': 'Tài khoản hoặc email đã tồn tại trong hệ thống.',
  'USER_NOT_FOUND': 'Không tìm thấy thông tin người dùng.',
  'ACCOUNT_NOT_FOUND': 'Tài khoản không tồn tại, vui lòng kiểm tra lại.',
  'EMAIL_NOT_FOUND': 'Địa chỉ email chưa được đăng ký.',
  'EMAIL_EXIST': 'Email này đã được sử dụng.',
  'OTP_SENT_RECENTLY': 'Mã OTP đã được gửi, vui lòng thử lại sau ít phút.',
  'OTP_INVALID': 'Mã xác thực không chính xác hoặc đã hết hạn.',
  'INVALID_TOKEN': 'Phiên làm việc đã hết hạn, vui lòng đăng nhập lại.',
  'ACCOUNT_INACTIVE': 'Tài khoản của bạn hiện đang bị tạm khóa.',
  'PASSWORD_NOT_MATCH': 'Mật khẩu không chính xác.',
  'ROLLBACK_FAILED': 'Đã có lỗi hệ thống trong quá trình đăng ký.',

  // Post Errors
  'POST_NOT_FOUND': 'Bài đăng không còn tồn tại hoặc đã bị gỡ.',
  'CUSTOMER_NOT_OWNER': 'Bạn không có quyền chỉnh sửa bài đăng này.',
  'STATE_NOT_ALLOW': 'Trạng thái bài đăng hiện tại không cho phép thực hiện thao tác này.',
  'CONTENT_VIOLATION': 'Nội dung bài viết vi phạm tiêu chuẩn cộng đồng (AI phát hiện).',
  'IMAGE_SIZE_LIMIT_EXCEEDED': 'Kích thước ảnh không được vượt quá 5MB.',
  'VIDEO_SIZE_LIMIT_EXCEEDED': 'Kích thước video không được vượt quá 25MB.',
  'FILE_SIZE_LIMIT_EXCEEDED': 'Kích thước tệp tin không được vượt quá 25MB.',
  'FILE_NOT_FOUND': 'Vui lòng chọn tệp tin hợp lệ.',
  'UPLOAD_FAILED': 'Tải lên không thành công, vui lòng thử lại.',
  'FETCH_POSTS_FAILED': 'Không thể lấy dữ liệu bài đăng vào lúc này.',

  // Admin / Moderation Errors
  'MODERATOR_NOT_FOUND': 'Không tìm thấy thông tin kiểm duyệt viên.',
  'MODERATION_FAILED': 'Thao tác kiểm duyệt không thành công.',
  'REQUIRED_REASON': 'Vui lòng cung cấp lý do khi từ chối bài đăng.',
  'UPDATE_PROFILE_FAILED': 'Cập nhật thông tin không thành công.',

  // System Errors
  'INTERNAL_SERVER_ERROR': 'Hệ thống đang gặp sự cố kỹ thuật, vui lòng thử lại sau.',
  'VALIDATION_ERROR': 'Dữ liệu đầu vào không hợp lệ.',
};

/**
 * Get user-friendly error message from static code
 * @param code The static error code from Backend
 * @returns Vietnamese error message
 */
export const getErrorMessage = (code: string): string => {
  return ERROR_MESSAGES[code] || 'Đã có lỗi xảy ra. Vui lòng liên hệ hỗ trợ.';
};
