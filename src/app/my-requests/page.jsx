"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function MyRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const userData = authClient.useSession();
  const user = userData.data?.user;

  useEffect(() => {
    const fetchRequests = async () => {
      if (!user?.email) return;

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/request?email=${user.email}`
        );
        const data = await res.json();

        setRequests(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [user]);

  const handleCancel = async (id) => {
    const confirm = window.confirm("Cancel this request?");
    if (!confirm) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/request/${id}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        setRequests((prev) => prev.filter((r) => r._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#170C79] font-bold text-xl">
        Loading requests...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EFE3CA] py-10 px-4">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-extrabold text-[#170C79] mb-8 text-center">
          My Adoption Requests 🐾
        </h1>

        <div className="overflow-x-auto bg-white rounded-3xl shadow-lg border border-[#56B6C6]/20">
          <table className="table">

            <thead className="bg-[#56B6C6] text-white">
              <tr>
                <th>Pet Name</th>
                <th>Request Date</th>
                <th>Pickup Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {requests.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-10 text-[#170C79]">
                    No adoption requests found 🐶
                  </td>
                </tr>
              ) : (
                requests.map((req) => (
                  <tr key={req._id} className="hover">

                    {/* Pet Name */}
                    <td className="font-semibold text-[#170C79]">
                      {req.petName}
                    </td>

                    {/* Request Date */}
                    <td>
                      {new Date(req.createdAt).toLocaleDateString()}
                    </td>

                    {/* Pickup Date */}
                    <td>
                      {req.pickupDate}
                    </td>

                    {/* Status */}
                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-bold
                          ${
                            req.status === "pending"
                              ? "bg-yellow-200 text-yellow-800"
                              : req.status === "approved"
                              ? "bg-green-200 text-green-800"
                              : "bg-red-200 text-red-800"
                          }
                        `}
                      >
                        {req.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="flex gap-2">

                      <Link href={`/pets/${req.petId}`}>
                        <button className="btn btn-sm bg-[#56B6C6] text-white hover:bg-[#170C79]">
                          View
                        </button>
                      </Link>

                      <button
                        onClick={() => handleCancel(req._id)}
                        className="btn btn-sm bg-red-500 text-white hover:bg-red-700"
                      >
                        Cancel
                      </button>

                    </td>
                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}