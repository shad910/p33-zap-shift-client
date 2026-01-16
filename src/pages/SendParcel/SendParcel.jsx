import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

/* =====================================================
   SEND PARCEL COMPONENT
===================================================== */
const SendParcel = () => {
    const { user } = useAuth();

    /* ---------- DATA FROM LOADER ---------- */
    const { data: warehouses } = useLoaderData();

    /* ---------- FORM ---------- */
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            parcelType: "document",
            senderName: user?.displayName || "John Doe",
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

        const parcelId = `P-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        details.push(`Parcel ID: ${parcelId}`);
        details.push(`Sender: ${user?.displayName || "John Doe"}`);

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
            title: "Confirm Booking",
            html: `<div style="text-align:left;font-size:14px">${breakdown}<hr/><strong>Total Cost: ৳${total}</strong></div>`,
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "Confirm",
        }).then((res) => {
            if (res.isConfirmed) {
                const payload = {
                    ...data,
                    parcelId,
                    deliveryCost: total,
                    creation_date: new Date().toISOString(),
                };
                console.log("SAVE TO DB:", payload);
                Swal.fire("Success", "Parcel booked successfully!", "success");
            }
        });
    };

    return (
        <section className="py-16 ">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-bold mb-2">Send A Parcel</h2>
                <p className="text-gray-500 mb-8">Enter your parcel details</p>

                <form onSubmit={handleSubmit(onSubmit)} className="p-6 rounded-xl shadow space-y-10">

                    {/* ---------------- PARCEL INFO ---------------- */}
                    <div className="space-y-4">

                        {/* Parcel Type Radios */}
                        <div className="space-y-1.5">
                            <label className="font-semibold block">Parcel Type</label>
                            <div className="flex items-center gap-4 text-sm">
                                <label className="flex items-center gap-1">
                                    <input type="radio" value="document" {...register("parcelType", { required: "Parcel type required" })} className="radio radio-success" />
                                    Document
                                </label>
                                <label className="flex items-center gap-1">
                                    <input type="radio" value="non-document" {...register("parcelType", { required: "Parcel type required" })} className="radio radio-success" />
                                    Non-Document
                                </label>
                            </div>
                            {errors.parcelType && <p className="text-red-500 text-sm">{errors.parcelType.message}</p>}
                        </div>

                        {/* Other Parcel Inputs */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="font-semibold block">Parcel Title</label>
                                <input {...register("parcelTitle", { required: "Title required" })} placeholder="Parcel Title" className="input input-bordered w-full" />
                                {errors.parcelTitle && <p className="text-red-500 text-sm">{errors.parcelTitle.message}</p>}
                            </div>

                            {parcelType === "non-document" && (
                                <div className="space-y-1.5">
                                    <label className="font-semibold block">Weight (kg)</label>
                                    <input type="number" {...register("parcelWeight", { required: "Weight required" })} placeholder="Weight (kg)" className="input input-bordered w-full" />
                                    {errors.parcelWeight && <p className="text-red-500 text-sm">{errors.parcelWeight.message}</p>}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ---------------- SENDER + RECEIVER ---------------- */}
                    <div className="grid lg:grid-cols-2 gap-8">

                        {/* Sender */}
                        <div className="space-y-4">
                            <h3 className="font-semibold mb-2.5">Sender Details</h3>
                            <div className="space-y-1.5">
                                <label className="font-semibold block">Name</label>
                                <input {...register("senderName")} className="input input-bordered w-full" disabled />
                            </div>
                            <div className="space-y-1.5">
                                <label className="font-semibold block">Address</label>
                                <input {...register("senderAddress", { required: "Address required" })} placeholder="Sender Address" className="input input-bordered w-full" />
                                {errors.senderAddress && <p className="text-red-500 text-sm">{errors.senderAddress.message}</p>}
                            </div>
                            <div className="space-y-1.5">
                                <label className="font-semibold block">Contact</label>
                                <input {...register("senderContact", { required: "Contact required" })} placeholder="Sender Contact" className="input input-bordered w-full" />
                                {errors.senderContact && <p className="text-red-500 text-sm">{errors.senderContact.message}</p>}
                            </div>
                            <div className="space-y-1.5">
                                <label className="font-semibold block">Region</label>
                                <select {...register("senderRegion", { required: "Region required" })} className="select select-bordered w-full">
                                    <option value="">Select Region</option>
                                    {regions.map((r) => <option key={r}>{r}</option>)}
                                </select>
                                {errors.senderRegion && <p className="text-red-500 text-sm">{errors.senderRegion.message}</p>}
                            </div>
                            <div className="space-y-1.5">
                                <label className="font-semibold block">Service Center</label>
                                <select {...register("senderCenter", { required: "Service center required" })} className="select select-bordered w-full">
                                    <option value="">Select Service Center</option>
                                    {senderCenters.map((c) => <option key={c.city} value={c.city}>{c.city}</option>)}
                                </select>
                                {errors.senderCenter && <p className="text-red-500 text-sm">{errors.senderCenter.message}</p>}
                            </div>
                            <div className="space-y-1.5">
                                <label className="font-semibold block">Pickup Instruction</label>
                                <textarea {...register("pickupInstruction", { required: "Pickup instruction required" })} placeholder="Pickup Instruction" className="textarea textarea-bordered w-full" rows={3} />
                                {errors.pickupInstruction && <p className="text-red-500 text-sm">{errors.pickupInstruction.message}</p>}
                            </div>
                        </div>

                        {/* Receiver */}
                        <div className="space-y-4">
                            <h3 className="font-semibold mb-2.5">Receiver Details</h3>
                            <div className="space-y-1.5">
                                <label className="font-semibold block">Name</label>
                                <input {...register("receiverName", { required: "Name required" })} placeholder="Receiver Name" className="input input-bordered w-full" />
                                {errors.receiverName && <p className="text-red-500 text-sm">{errors.receiverName.message}</p>}
                            </div>
                            <div className="space-y-1.5">
                                <label className="font-semibold block">Address</label>
                                <input {...register("receiverAddress", { required: "Address required" })} placeholder="Receiver Address" className="input input-bordered w-full" />
                                {errors.receiverAddress && <p className="text-red-500 text-sm">{errors.receiverAddress.message}</p>}
                            </div>
                            <div className="space-y-1.5">
                                <label className="font-semibold block">Contact</label>
                                <input {...register("receiverContact", { required: "Contact required" })} placeholder="Receiver Contact" className="input input-bordered w-full" />
                                {errors.receiverContact && <p className="text-red-500 text-sm">{errors.receiverContact.message}</p>}
                            </div>
                            <div className="space-y-1.5">
                                <label className="font-semibold block">Region</label>
                                <select {...register("receiverRegion", { required: "Region required" })} className="select select-bordered w-full">
                                    <option value="">Select Region</option>
                                    {regions.map((r) => <option key={r}>{r}</option>)}
                                </select>
                                {errors.receiverRegion && <p className="text-red-500 text-sm">{errors.receiverRegion.message}</p>}
                            </div>
                            <div className="space-y-1.5">
                                <label className="font-semibold block">Service Center</label>
                                <select {...register("receiverCenter", { required: "Service center required" })} className="select select-bordered w-full">
                                    <option value="">Select Service Center</option>
                                    {receiverCenters.map((c) => <option key={c.city} value={c.city}>{c.city}</option>)}
                                </select>
                                {errors.receiverCenter && <p className="text-red-500 text-sm">{errors.receiverCenter.message}</p>}
                            </div>
                            <div className="space-y-1.5">
                                <label className="font-semibold block">Delivery Instruction</label>
                                <textarea {...register("deliveryInstruction", { required: "Instruction required" })} placeholder="Delivery Instruction" className="textarea textarea-bordered w-full" rows={3} />
                                {errors.deliveryInstruction && <p className="text-red-500 text-sm">{errors.deliveryInstruction.message}</p>}
                            </div>
                        </div>

                    </div>

                    <button className="btn btn-primary text-black w-full lg:w-auto">Proceed to Confirm Booking</button>
                </form>
            </div>
        </section>
    );
};

export default SendParcel;
