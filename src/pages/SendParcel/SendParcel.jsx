import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate, } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

/* =====================================================
   SEND PARCEL COMPONENT
===================================================== */
const SendParcel = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  /* ---------- DATA FROM LOADER ---------- */
  const { data: warehouses } = useLoaderData();

  /* ---------- FORM ---------- */
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      parcelType: "document",
      senderName: user?.displayName || "anonymous",
      paymentStatus: "unpaid",
      deliveryStatus: "uncollected"
    },
  });

  /* ---------- WATCH ---------- */
  const parcelType = watch("parcelType");
  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");

  /* ---------- OPTIONS ---------- */
  const regions = useMemo(() => [...new Set(warehouses.map((w) => w.region))], [warehouses]);
  const senderCenters = useMemo(() => warehouses.filter((w) => w.region === senderRegion), [warehouses, senderRegion]);
  const receiverCenters = useMemo(() => warehouses.filter((w) => w.region === receiverRegion), [warehouses, receiverRegion]);

  /* ---------- GET PRICING DETAILS ---------- */
  const getPricingDetails = (data) => {
    const sameCity = data.senderRegion === data.receiverRegion && data.senderCenter === data.receiverCenter;
    const details = [];
    let total = 0;

    const parcelId = `PSI-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    details.push(`Parcel ID: ${parcelId}`);
    details.push(`Sender: ${user?.displayName || "User Unknown"}`);

    if (data.parcelType === "document") {
      const base = sameCity ? 60 : 80;
      details.push(`Parcel Type: Document`);
      details.push(`Delivery Scope: ${sameCity ? "Same City" : "Different City"}`);
      details.push(`Base Price: ৳${base}`);
      total = base;
    } else {
      const weight = Number(data.parcelWeight || 0);
      const base = sameCity ? 110 : 150;
      details.push(`Parcel Type: Non-Document`);
      details.push(`Delivery Scope: ${sameCity ? "Same City" : "Different City"}`);
      details.push(`Base Price (up to 3kg): ৳${base}`);
      total = base;

      if (weight > 3) {
        const extraKg = weight - 3;
        const extraCost = extraKg * 40;
        details.push(`Extra Weight: ${extraKg}kg × ৳40 = ৳${extraCost}`);
        total += extraCost;
      }

      if (!sameCity) {
        details.push(`Inter-City Handling Fee: ৳40`);
        total += 40;
      }
    }

    return { parcelId, total, breakdown: details.join("<br/>") };
  };

  /* ---------- SUBMIT ---------- */
  const onSubmit = (data) => {
    const { parcelId, total, breakdown } = getPricingDetails(data);

    Swal.fire({
      title: "Review Parcel Details",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Proceed",
      cancelButtonText: "Cancel",
      html: `
            <div style="text-align:left;font-size:14px">

                <!-- STAGE 1: PARCEL INFO -->
                <div style="margin-bottom:12px">
                    <strong>📦 Parcel Information</strong>
                    <p style="margin:4px 0">
                        Type: ${data.parcelType}<br/>
                        Title: ${data.parcelTitle}<br/>
                        Weight: ${data.parcelType === "non-document"
          ? `${data.parcelWeight} kg`
          : "N/A"
        }
                    </p>
                </div>

                <hr/>

                <!-- STAGE 2: ROUTE INFO -->
                <div style="margin:10px 0">
                    <strong>📍 Delivery Route</strong>
                    <p style="margin:4px 0">
                        From: ${data.senderRegion} – ${data.senderCenter}<br/>
                        To: ${data.receiverRegion} – ${data.receiverCenter}
                    </p>
                </div>

                <hr/>

                <!-- STAGE 3: COST INFO -->
                <div style="margin:10px 0">
                    <strong>💰 Cost Breakdown</strong>
                    <p style="margin:4px 0">
                        ${breakdown}
                    </p>
                    <strong>Total Cost: ৳${total}</strong>
                </div>

            </div>
        `,
    }).then((res) => {
      if (res.isConfirmed) {

        const payload = {
          ...data,
          parcelId,
          deliveryCost: total,
          created_by: user?.email || "unknown",
          creation_date: new Date().toISOString(),
        };

        axiosSecure.post('/parcels', payload)
          .then((res) => {
            console.log("DB Response:", res);
            if (res.data.insertedId) {
              Swal.fire({
                icon: "success",
                title: "Parcel Booked",
                text: "Your parcel has been successfully booked.",
              });
              console.log("SAVE TO DB:", payload);
              navigate('/dashboard/my-parcels');
            }
          })
          .catch((err) => {
            console.error("DB Error:", err);
          });
      }
    });
  };


  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto p-6 rounded-lg shadow bg-base-100">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">Send A Parcel</h2>
        <p className="text-gray-500 mb-8 text-sm sm:text-base">Enter your parcel details</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">

          {/* ---------------- PARCEL INFO ---------------- */}
          <div className="space-y-4">

            {/* Parcel Type Radios */}
            <div className="space-y-1.5">
              <label className="font-semibold block text-sm sm:text-base">Parcel Type</label>
              <div className="flex flex-wrap items-center gap-4 text-sm sm:text-base">
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    value="document"
                    {...register("parcelType", { required: "Parcel type required" })}
                    className="radio radio-success"
                  />
                  Document
                </label>
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    value="non-document"
                    {...register("parcelType", { required: "Parcel type required" })}
                    className="radio radio-success"
                  />
                  Non-Document
                </label>
              </div>
              {errors.parcelType && <p className="text-red-500 text-xs sm:text-sm">{errors.parcelType.message}</p>}
            </div>

            {/* Other Parcel Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-semibold block text-sm sm:text-base">Parcel Title</label>
                <input
                  {...register("parcelTitle", { required: "Title required" })}
                  placeholder="Parcel Title"
                  className="input input-bordered w-full"
                />
                {errors.parcelTitle && <p className="text-red-500 text-xs sm:text-sm">{errors.parcelTitle.message}</p>}
              </div>

              {parcelType === "non-document" && (
                <div className="space-y-1.5">
                  <label className="font-semibold block text-sm sm:text-base">Weight (kg)</label>
                  <input
                    type="number"
                    {...register("parcelWeight", { required: "Weight required" })}
                    placeholder="Weight (kg)"
                    className="input input-bordered w-full"
                  />
                  {errors.parcelWeight && <p className="text-red-500 text-xs sm:text-sm">{errors.parcelWeight.message}</p>}
                </div>
              )}
            </div>
          </div>

          {/* ---------------- SENDER + RECEIVER ---------------- */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Sender */}
            <div className="space-y-4">
              <h3 className="font-semibold mb-2.5 text-base sm:text-lg">Sender Details</h3>

              <div className="space-y-1.5">
                <label className="font-semibold block text-sm sm:text-base">Name</label>
                <input
                  {...register("senderName", { maxLength: 15 })}
                  className={`input input-bordered w-full ${errors.senderName ? "input-error" : ""}`}
                  disabled
                />
                {errors.senderName && <p className="text-red-500 text-xs sm:text-sm">Name cannot exceed 15 characters</p>}
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold block text-sm sm:text-base">Address</label>
                <input
                  {...register("senderAddress", { required: "Address required" })}
                  placeholder="Sender Address"
                  className="input input-bordered w-full"
                />
                {errors.senderAddress && <p className="text-red-500 text-xs sm:text-sm">{errors.senderAddress.message}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold block text-sm sm:text-base">Contact</label>
                <input
                  {...register("senderContact", { required: "Contact required" })}
                  placeholder="Sender Contact"
                  className="input input-bordered w-full"
                />
                {errors.senderContact && <p className="text-red-500 text-xs sm:text-sm">{errors.senderContact.message}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold block text-sm sm:text-base">Region</label>
                <select
                  {...register("senderRegion", { required: "Region required" })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select Region</option>
                  {regions.map((r) => <option key={r}>{r}</option>)}
                </select>
                {errors.senderRegion && <p className="text-red-500 text-xs sm:text-sm">{errors.senderRegion.message}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold block text-sm sm:text-base">Service Center</label>
                <select
                  {...register("senderCenter", { required: "Service center required" })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select Service Center</option>
                  {senderCenters.map((c) => <option key={c.city} value={c.city}>{c.city}</option>)}
                </select>
                {errors.senderCenter && <p className="text-red-500 text-xs sm:text-sm">{errors.senderCenter.message}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold block text-sm sm:text-base">Pickup Instruction</label>
                <textarea
                  {...register("pickupInstruction", { required: "Pickup instruction required" })}
                  placeholder="Pickup Instruction"
                  className="textarea textarea-bordered w-full"
                  rows={3}
                />
                {errors.pickupInstruction && <p className="text-red-500 text-xs sm:text-sm">{errors.pickupInstruction.message}</p>}
              </div>
            </div>

            {/* Receiver */}
            <div className="space-y-4">
              <h3 className="font-semibold mb-2.5 text-base sm:text-lg">Receiver Details</h3>

              <div className="space-y-1.5">
                <label className="font-semibold block text-sm sm:text-base">Name</label>
                <input
                  {...register("receiverName", {
                    required: "Name required",
                    maxLength: { value: 15, message: "Name cannot exceed 15 characters" }
                  })}
                  placeholder="Receiver Name"
                  className="input input-bordered w-full"
                />
                {errors.receiverName && <p className="text-red-500 text-xs sm:text-sm">{errors.receiverName.message}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold block text-sm sm:text-base">Address</label>
                <input
                  {...register("receiverAddress", { required: "Address required" })}
                  placeholder="Receiver Address"
                  className="input input-bordered w-full"
                />
                {errors.receiverAddress && <p className="text-red-500 text-xs sm:text-sm">{errors.receiverAddress.message}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold block text-sm sm:text-base">Contact</label>
                <input
                  {...register("receiverContact", { required: "Contact required" })}
                  placeholder="Receiver Contact"
                  className="input input-bordered w-full"
                />
                {errors.receiverContact && <p className="text-red-500 text-xs sm:text-sm">{errors.receiverContact.message}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold block text-sm sm:text-base">Region</label>
                <select
                  {...register("receiverRegion", { required: "Region required" })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select Region</option>
                  {regions.map((r) => <option key={r}>{r}</option>)}
                </select>
                {errors.receiverRegion && <p className="text-red-500 text-xs sm:text-sm">{errors.receiverRegion.message}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold block text-sm sm:text-base">Service Center</label>
                <select
                  {...register("receiverCenter", { required: "Service center required" })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select Service Center</option>
                  {receiverCenters.map((c) => <option key={c.city} value={c.city}>{c.city}</option>)}
                </select>
                {errors.receiverCenter && <p className="text-red-500 text-xs sm:text-sm">{errors.receiverCenter.message}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold block text-sm sm:text-base">Delivery Instruction</label>
                <textarea
                  {...register("deliveryInstruction", { required: "Instruction required" })}
                  placeholder="Delivery Instruction"
                  className="textarea textarea-bordered w-full"
                  rows={3}
                />
                {errors.deliveryInstruction && <p className="text-red-500 text-xs sm:text-sm">{errors.deliveryInstruction.message}</p>}
              </div>
            </div>

          </div>

          <button className="btn btn-primary text-black w-full sm:w-auto">Proceed to Confirm Booking</button>
        </form>
      </div>
    </section>
  );
};

export default SendParcel;
