import quoteImg from "../../../../assets/reviewQuote.png";

const ReviewCard = ({ item, active = false, aos }) => {
  return (
    <div
      data-aos={aos}
      className={`bg-white rounded-2xl shadow-xl p-8 w-80 md:w-96 transition-all duration-500
        ${active ? "scale-100 opacity-100" : "scale-90 opacity-40 blur-[1px]"}
      `}
    >
      <img src={quoteImg} alt="quote" className="mb-4" />

      <p className="text-gray-600 mb-6 text-sm">
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
          <h4 className="font-semibold text-sm">{item.userName}</h4>
          <p className="text-xs text-gray-400">Verified Customer</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
