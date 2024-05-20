// components/LoginForm.tsx
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "./loginform.css";

export default function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        const data = await res.json();
        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(data.user));
        }
        setError(null);
        router.push("/home");
      } else {
        const errorData = await res.json();
        setError(errorData.message);
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <section
      className="h-100 gradient-form"
      style={{ backgroundColor: "#eee" }}
    >
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-10">
            <div className="card rounded-3 text-black">
              <div className="row g-0">
                <div className="col-lg-6">
                  <div className="card-body p-md-5 mx-md-4">
                    <div className="text-center">
                      <h2 className="mt-1 mb-5 pb-1">Info.in</h2>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <p>Please login to your account</p>
                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          id="form2Example11"
                          className="form-control"
                          placeholder="Your email address"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          placeholder="Your password"
                          id="form2Example22"
                          className="form-control"
                          name="password"
                          value={form.password}
                          onChange={handleChange}
                        />
                      </div>
                      {error && <p className="error">{error}</p>}
                      <div className="text-center pt-1 mb-5 pb-1">
                        <button
                          className="btn btn-primary btn-block mb-3"
                          type="submit"
                        >
                          Log in
                        </button>
                      </div>
                      <div className="d-flex align-items-center justify-content-center pb-4">
                        <p className="mb-0 me-2">Don't have an account?</p>
                        <Link href="/register">
                          <button
                            type="button"
                            className="btn btn-outline-secondary"
                          >
                            Create new
                          </button>
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                  <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                    <h4 className="mb-4">
                      Breeze Through the News: Your Casual Connection to Current
                      Events
                    </h4>
                    <p className="small mb-0">
                      We&apos;ve redefined how you experience the news. No stuffy
                      suits or formalities here&mdash;just a casual connection to the
                      stories that matter. Join us as we breeze through the
                      latest headlines, offering you a relaxed yet informative
                      approach to staying updated. Whether you&apos;re lounging at
                      home or on the go, let us be your laid-back guide to the
                      ever-changing world around us.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
