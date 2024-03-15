"use client";
import { RecoilEnv, RecoilRoot } from "recoil";
RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;
const RecoilProvider = ({ children }: { children: React.ReactNode }) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};

export { RecoilProvider };
