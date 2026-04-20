'use client';
import React from 'react';
import { signUpWithId } from '@/lib/auth.service';
import { SignUp } from '@/views/auth/signup';

const SignUpPage = () => {
  // const [formData, setFormData] = useState({ id: '', pw: '', betaKey: '' });
  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   try {
  //     await signUpWithId(formData.id, formData.pw, formData.betaKey);
  //     alert('가입 신청 완료! 관리자 승인을 기다려주세요.');
  //   } catch (err: any) {
  //     if (err.code === 'auth/email-already-in-use') {
  //       alert('이미 존재하는 아이디입니다.');
  //     } else {
  //       alert('오류가 발생했습니다: ' + err.message);
  //     }
  //   }
  // };

  return (
    <SignUp />
    // <form onSubmit={handleSubmit} className="flex flex-col gap-4">
    //   <input
    //     placeholder="한글 아이디"
    //     onChange={e => setFormData({ ...formData, id: e.target.value })}
    //     className="rounded border p-2"
    //   />
    //   <input
    //     type="password"
    //     placeholder="비밀번호"
    //     onChange={e => setFormData({ ...formData, pw: e.target.value })}
    //     className="rounded border p-2"
    //   />
    //   <input
    //     placeholder="베타 키 입력"
    //     onChange={e => setFormData({ ...formData, betaKey: e.target.value })}
    //     className="rounded border p-2"
    //   />
    //   <button type="submit" className="rounded bg-blue-500 p-2 text-white">
    //     가입하기
    //   </button>
    // </form>
  );
};

export default SignUpPage;
