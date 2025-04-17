import { NextRequest, NextResponse } from "next/server";
import { GitHubAuthRepository } from "@/infra/repositories/github/AuthRepository";
// import { GoogleAuthRepository } from "@/infra/repositories/google/AuthRepository";
import { LoginWithGitHubUsecase } from "@/application/usecase/user/LoginWithGithub";
// import { LoginWithGoogleUsecase } from "@/application/usecase/loginWithGoogle";

export async function POST(req: NextRequest, { params }: { params: { provider: string } }) {
  const { code } = await req.json();

  if (!code || !params.provider) {
    return NextResponse.json({ error: "Missing code or provider" }, { status: 400 });
  }

  let token = "";

  try {
    switch (params.provider) {
      case "github": {
        const repo = new GitHubAuthRepository();
        const usecase = new LoginWithGitHubUsecase(repo);
        token = await usecase.execute(code);
        break;
      }
      //   case "google": {
      //     const repo = new GoogleAuthRepository();
      //     const usecase = new LoginWithGoogleUsecase(repo);
      //     token = await usecase.execute(code);
      //     break;
      //   }
      default:
        return NextResponse.json({ error: "Unsupported provider" }, { status: 400 });
    }

    return NextResponse.json({ token }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
