/*eslint-disable*/
// import { useState } from "react"

// const OtpView = ({ onVerifyOtp, onResendOtp, isLoading }) => {
//     const [otp, setOtp] = useState("")

//     return (
//         <div className="p-3 text-center">
//             <h4>OTP Verification</h4>
//             <p>Enter the OTP sent to your registered email/mobile</p>

//             <input
//                 type="text"
//                 maxLength={6}
//                 className="form-control text-center mb-2"
//                 placeholder="Enter OTP"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//             />

//             <button
//                 className="btn btn-primary w-100"
//                 disabled={otp.length !== 6 || isLoading}
//                 onClick={() => onVerifyOtp(otp)}
//             >
//                 Verify OTP
//             </button>

//             <button
//                 className="btn btn-link mt-2"
//                 onClick={onResendOtp}
//             >
//                 Resend OTP
//             </button>
//         </div>
//     )
// }

// export default OtpView
/*eslint-disable*/
import { useState } from "react"

const OtpView = ({ onVerifyOtp, onResendOtp, onSkipOtp, isLoading }) => {
  const [otp, setOtp] = useState("")

  return (
    <div className="p-4 text-center">
      <h4>OTP Verification</h4>
      <p>Enter the OTP sent to your registered email/mobile</p>

      <input
        type="text"
        maxLength={6}
        className="form-control text-center mb-3"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      <button
        className="btn btn-primary w-100 mb-2"
        disabled={otp.length !== 6 || isLoading}
        onClick={() => onVerifyOtp && onVerifyOtp(otp)}
      >
        Verify OTP
      </button>

      <button
        className="btn btn-link w-100"
        onClick={onResendOtp}
      >
        Resend OTP
      </button>

      {/* 🔴 TEMPORARY SKIP BUTTON */}
      <button
        className="btn btn-outline-secondary w-100 mt-3"
        onClick={onSkipOtp}
      >
        Skip OTP (Temporary)
      </button>
    </div>
  )
}

export default OtpView

