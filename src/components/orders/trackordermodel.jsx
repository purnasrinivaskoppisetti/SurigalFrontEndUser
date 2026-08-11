"use client";

import { X, Truck, MapPin, Calendar, Loader2, PackageCheck } from "lucide-react";
import { useTrackOrder } from "@/hooks/useTrackorder";

export default function TrackOrderModal({ orderId, isOpen, onClose }) {
  // Pass orderId only when modal is open to control fetching
  const { data: tracking, loading, error } = useTrackOrder(isOpen ? orderId : null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-6 shadow-xl transition-all">
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-blue-50 p-3 text-blue-600">
              <Truck size={22} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Track Shipment</h2>
              <p className="text-xs text-gray-500">
                Order: <span className="font-semibold text-gray-700">{tracking?.order_number || "..."}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        {/* LOADING STATE */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <p className="mt-3 text-sm font-medium">Fetching shipment status...</p>
          </div>
        )}

        {/* ERROR STATE */}
        {error && !loading && (
          <div className="my-6 rounded-2xl bg-red-50 p-4 text-center text-sm text-red-600">
            {error}
          </div>
        )}

        {/* CONTENT */}
        {!loading && !error && tracking && (
          <div className="mt-5 space-y-6">
            {/* OVERVIEW CARD */}
            <div className="rounded-2xl bg-gray-50 p-4">
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-gray-400">Courier</span>
                  <p className="font-semibold text-gray-800">{tracking.courier}</p>
                </div>
                <div>
                  <span className="text-gray-400">AWB Number</span>
                  <p className="font-semibold text-gray-800">{tracking.awb_number}</p>
                </div>
                <div>
                  <span className="text-gray-400">Status</span>
                  <p className="capitalize font-semibold text-blue-600">
                    {tracking.tracking_status}
                  </p>
                </div>
                <div>
                  <span className="text-gray-400">Order Status</span>
                  <p className="capitalize font-semibold text-green-600">
                    {tracking.order_status}
                  </p>
                </div>
              </div>

              {/* ORIGIN & DESTINATION ROUTE */}
              <div className="mt-4 flex items-center justify-between border-t border-gray-200/60 pt-3 text-xs">
                <div className="flex items-center gap-1.5 font-medium text-gray-700">
                  <MapPin size={14} className="text-gray-400" />
                  <span>{tracking.origin}</span>
                </div>
                <div className="h-[2px] flex-1 bg-dashed bg-gray-300 mx-3" />
                <div className="flex items-center gap-1.5 font-medium text-gray-700">
                  <MapPin size={14} className="text-blue-600" />
                  <span>{tracking.destination}</span>
                </div>
              </div>
            </div>

            {/* TRACKING TIMELINE */}
            <div>
              <h3 className="mb-4 text-sm font-bold text-gray-900">Shipment History</h3>
              <div className="relative ml-2 border-l-2 border-gray-200 pl-6 space-y-6">
                {tracking.scans?.map((scan, index) => (
                  <div key={index} className="relative">
                    {/* TIMELINE ICON DOT */}
                    <span className="absolute -left-[31px] top-0 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 ring-4 ring-white">
                      <PackageCheck size={12} className="text-white" />
                    </span>

                    {/* DETAILS */}
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {scan.scan_status}
                      </p>
                      <p className="mt-0.5 text-xs text-gray-500 flex items-center gap-1">
                        <MapPin size={12} />
                        {scan.scanned_location}
                      </p>
                      <p className="mt-1 text-[11px] text-gray-400 flex items-center gap-1">
                        <Calendar size={12} />
                        {new Date(scan.scanned_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}