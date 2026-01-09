import quoteImg from "../../../../assets/reviewQuote.png";

const ReviewCard = ({ item, active = false, aos }) => {
  return (
    <div
      data-aos={aos}
      className={` rounded-2xl shadow-xl p-8 w-80 transition-all duration-500
        ${active ? "scale-100 opacity-100" : "scale-90 opacity-40 blur-[1px]"}
      `}
    >
      <img src={quoteImg} alt="quote" className="mb-4" />

      <p className="text-gray-400 mb-6 text-xs md:text-sm">
        “{item.review}”
      </p>

      <div className="divider divider-dashed"></div>

      <div className="flex items-center gap-3 mt-4">
        <img
          src={item.user_photoURL}
          alt={item.userName}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <h4 className="font-semibold text-xs md:text-sm">{item.userName}</h4>
          <p className="text-[8px] sm:text-xs text-gray-500">Verified Customer</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
