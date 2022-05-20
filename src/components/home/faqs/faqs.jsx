import React, { useState, useEffect } from "react";
import axiosInstance from "../../../api/axiosInstance";
import DataLoader from "../../common/Loader";

const Faqs = () => {
  const [faqs, setFaqs] = useState([]);
  const [activeFaq, setActiveFaq] = useState(0);
  const [blogLoading, setBlogLoading] = useState(true);

  const handleChangeActiveFaq = (index) => {
    if (index !== activeFaq) {
      setActiveFaq(index);
    } else {
      setActiveFaq("");
    }
  };

  const getAllFaqs = (signal) => {
    axiosInstance
      .get(`/settings/Faq/`, { signal })
      .then((res) => {
        // setfaqListObj(res.data);
        // let val = [];
        // for (let i = 0; i < res.data.length; i++) {
        //   val.push({
        //     title: res.data[i].title,
        //     description: res.data[i].description,
        //   });
        // }
        setFaqs(res.data);
        setBlogLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setBlogLoading(false);
      });
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    getAllFaqs(signal);
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className="space-y-8 max-w-7xl mx-auto" id="faqs">
      <div className="mx-auto text-center text-4xl font-medium">FAQS</div>

      {faqs.length === 0 && !blogLoading && (
        <div className="flex justify-center">No Data Available</div>
      )}

      {faqs.length > 0 && (
        <div className="rounded-xl overflow-hidden border border-gray4 text-gray7 text-sm">
          {faqs.map((faq, index) => {
            const { title, description } = faq;
            return (
              <div
                key={index}
                className={
                  faqs.length - 1 > index ? "border-b border-gray4" : ""
                }
              >
                <div
                  className={`flex justify-between p-4 cursor-pointer`}
                  onClick={() => handleChangeActiveFaq(index)}
                >
                  <div className="font-semibold text-gray-800">Q. {title}</div>
                  <div className="text-pink2">
                    {activeFaq === index && (
                      <svg
                        fill="currentColor"
                        viewBox="0 0 512 512"
                        className="w-5 h-5"
                      >
                        <path d="m256 512c-68.378906 0-132.667969-26.628906-181.019531-74.980469-48.351563-48.351562-74.980469-112.640625-74.980469-181.019531s26.628906-132.667969 74.980469-181.019531c48.351562-48.351563 112.640625-74.980469 181.019531-74.980469s132.667969 26.628906 181.019531 74.980469c48.351563 48.351562 74.980469 112.640625 74.980469 181.019531s-26.628906 132.667969-74.980469 181.019531c-48.351562 48.351563-112.640625 74.980469-181.019531 74.980469zm0-472c-119.101562 0-216 96.898438-216 216s96.898438 216 216 216 216-96.898438 216-216-96.898438-216-216-216zm110 195.980469h-220v40h220zm0 0" />
                      </svg>
                    )}
                    {activeFaq !== index && (
                      <svg
                        fill="currentColor"
                        viewBox="0 0 512 512"
                        className="w-5 h-5"
                      >
                        <g>
                          <g>
                            <path
                              d="M256,0C114.833,0,0,114.833,0,256s114.833,256,256,256s256-114.853,256-256S397.167,0,256,0z M256,472.341
                     c-119.275,0-216.341-97.046-216.341-216.341S136.725,39.659,256,39.659S472.341,136.705,472.341,256S375.295,472.341,256,472.341z
                     "
                            />
                          </g>
                        </g>
                        <g>
                          <g>
                            <path
                              d="M355.148,234.386H275.83v-79.318c0-10.946-8.864-19.83-19.83-19.83s-19.83,8.884-19.83,19.83v79.318h-79.318
                     c-10.966,0-19.83,8.884-19.83,19.83s8.864,19.83,19.83,19.83h79.318v79.318c0,10.946,8.864,19.83,19.83,19.83
                     s19.83-8.884,19.83-19.83v-79.318h79.318c10.966,0,19.83-8.884,19.83-19.83S366.114,234.386,355.148,234.386z"
                            />
                          </g>
                        </g>
                      </svg>
                    )}
                  </div>
                </div>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    activeFaq === index ? "max-height-faq" : "max-h-0"
                  }`}
                >
                  <div
                    className="text-sm p-4 pr-20 pt-0 leading-7"
                    dangerouslySetInnerHTML={{
                      __html: description,
                    }}
                  >
                    {/* {description} */}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {blogLoading && (
        <div className="flex items-center justify-center py-6 space-x-3">
          <div className="text-xl">Loading</div>
          <div>
            <DataLoader />
          </div>
        </div>
      )}
    </div>
  );
};

export default Faqs;
