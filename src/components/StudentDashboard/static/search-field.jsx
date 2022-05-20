export const SearchField = ({
  placeholder = "Search...",
  value,
  handleChange,
}) => {
  return (
    <div className="relative w-80 text-sm h-full">
      <input
        type="text"
        value={value}
        onChange={(event) => handleChange(event.target.value)}
        className="rounded-full h-full pl-5 pr-16 w-full focus:border-gray-300 transition-all duration-300"
        placeholder={placeholder}
        spellCheck="false"
      />

      <div
        className="absolute top-1/2 h-7 w-7 rounded-full right-1 cursor-pointer flex items-center justify-center"
        style={{ transform: "translateY(-50%)" }}
      >
        <svg viewBox="0 0 512.005 512.005" fill="currentColor" className="w-4">
          <g>
            <g>
              <path
                d="M505.749,475.587l-145.6-145.6c28.203-34.837,45.184-79.104,45.184-127.317c0-111.744-90.923-202.667-202.667-202.667
              S0,90.925,0,202.669s90.923,202.667,202.667,202.667c48.213,0,92.48-16.981,127.317-45.184l145.6,145.6
              c4.16,4.16,9.621,6.251,15.083,6.251s10.923-2.091,15.083-6.251C514.091,497.411,514.091,483.928,505.749,475.587z
               M202.667,362.669c-88.235,0-160-71.765-160-160s71.765-160,160-160s160,71.765,160,160S290.901,362.669,202.667,362.669z"
              />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
};
