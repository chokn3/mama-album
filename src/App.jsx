import { useState, useRef, useCallback, useEffect } from "react";
import WelcomePage from "./WelcomePage.jsx";

// ─── YOUR PHOTOS ───────────────────────────────────────────────
const COVER_PHOTO = "https://lh3.googleusercontent.com/d/12jSAoRv6CdYcoH9LIsSJZaa4o0OvbnNh"; 
const pages = [
  "cover",
  {
    top: "https://lh3.googleusercontent.com/d/1rHVz4J_CSTl91QDFzi50HSmx8yBF1QrS",
    bottom: "https://lh3.googleusercontent.com/d/1hAE9oghGazLqx_Et-MC_wHrJ11M711Sj",
    topTilt: "-1.5deg",
    bottomTilt: "1.2deg",
  },
  {
    top: "https://lh3.googleusercontent.com/d/1hs38OQXqiHqqO8mH6DshE4pQi6mkogTY",
    bottom: "https://lh3.googleusercontent.com/d/1DGH2j_WOIoqPWYTlOwoWgA8kPiYVy6Rw",
    topTilt: "1deg",
    bottomTilt: "-0.8deg",
  },
  {
    top: "https://lh3.googleusercontent.com/d/1ig1gWz1Y5j58EwgzQGgmYa47vPpWRYA9",
    bottom: "https://lh3.googleusercontent.com/d/1HcRVes990YRxuLMyqim6jMRkGK1s8uBn",
    topTilt: "-1.2deg",
    bottomTilt: "1.5deg",
  },
  {
    top: "https://lh3.googleusercontent.com/d/1YjAsp_5KLi18GdYcmuLomrEOwQodCOlq",
    bottom: "https://lh3.googleusercontent.com/d/1HWa-6hw5LvUOfmWfJyUyVJkM_Eh_k9cq",
    topTilt: "-1.2deg",
    bottomTilt: "1.5deg",
  },
  {
    top: "https://lh3.googleusercontent.com/d/1g5mwSOBo4ksJsvruZ3VNRVwQUPmSXh5E",
    bottom: "https://lh3.googleusercontent.com/d/1S71ppfbfGR-MeCzZyySOpc3HSmocB6LY",
    topTilt: "-1.2deg",
    bottomTilt: "1.5deg",
  },
  {
    top: "https://lh3.googleusercontent.com/d/1ap29_QV7UrvxPkvFYo7B9-oK7pXLA1Pt",
    bottom: "https://lh3.googleusercontent.com/d/1a7l56ywOD1UR4X-_90O2X0tJqeAcWmnS",
    topTilt: "-1.2deg",
    bottomTilt: "1.5deg",
  },
  {
    top: "https://lh3.googleusercontent.com/d/1rsYWkAY_gjPb7VgeIbu6sY55lwuBDFmN",
    bottom: "https://lh3.googleusercontent.com/d/15sR1V1e1OHOsw0jOToRXycQ9tAJJvZ7R",
    topTilt: "-1.2deg",
    bottomTilt: "1.5deg",
  },
  {
    top: "https://lh3.googleusercontent.com/d/1kwf6GfzqAHdRJAPnWM_yMdGBcH9V5p_b",
    bottom: "https://lh3.googleusercontent.com/d/1L8ZapD4OWuDV2CD7eoDQHd9U7vMdWJYr",
    topTilt: "-1.2deg",
    bottomTilt: "1.5deg",
  },
  {
    top: "https://lh3.googleusercontent.com/d/1QrSjRg10_2ULpr6NcwJHYk7vHXUJKNrQ",
    bottom: "https://lh3.googleusercontent.com/d/1ap29_QV7UrvxPkvFYo7B9-oK7pXLA1Pt",
    topTilt: "-1.2deg",
    bottomTilt: "1.5deg",
  },
  {
    top: "https://lh3.googleusercontent.com/d/11TUv8j7rUILk_hxlRFWAYIkI6XdtTrd7",
    bottom: "https://lh3.googleusercontent.com/d/1ChAskFm3c6Ib8zBYxl8ajlKEko_qZR2R",
    topTilt: "-1.2deg",
    bottomTilt: "1.5deg",
  },
  {
    top: "https://lh3.googleusercontent.com/d/1pOCb7fuaL8TuEPXv7iK_QH6D0-1RWOvM",
    bottom: "https://lh3.googleusercontent.com/d/1PuZqDVvrjD2qybiZzN9r39VhWgqtHg8u",
    topTilt: "-1.2deg",
    bottomTilt: "1.5deg",
  },
  {
    top: "https://lh3.googleusercontent.com/d/1VZXSH3KTOlh8edS-oVIsTXs4tbDTAIGQ",
    bottom: "https://lh3.googleusercontent.com/d/1IZE19BNLZrz5a56lZKy15NIaeWaE7DVE",
    topTilt: "-1.2deg",
    bottomTilt: "1.5deg",
  },
  {
    top: "https://lh3.googleusercontent.com/d/1EQoVB2nm6yMr1ZTSoyQy4lK7gKof-Hol",
    bottom: "https://lh3.googleusercontent.com/d/1gsEpV-KG9jxqy_TbFwQySqoQrNecIDMv",
    topTilt: "-1.2deg",
    bottomTilt: "1.5deg",
  },
  {
    top: "https://lh3.googleusercontent.com/d/1KVF5RSePJeRanZzfOHHP5xqIgdYkoJDr",
    bottom: "https://lh3.googleusercontent.com/d/1kZpylD7j4c68jZOjwyM3MkuhowHgXQCB",
    topTilt: "-1.2deg",
    bottomTilt: "1.5deg",
  },
  {
    top: "https://lh3.googleusercontent.com/d/1nIlWI6HqrnZRd8XJ2XtiVaINj6zcSCvW",
    bottom: "https://lh3.googleusercontent.com/d/17P4fDK2UsCQLyLy4fMgZjaR6Bfr65wTC",
    topTilt: "-1.2deg",
    bottomTilt: "1.5deg",
  },
  {
    top: "https://lh3.googleusercontent.com/d/1Imbg6AENqriGs99cDFQo7bGHKpUKpqXc",
    bottom: "https://lh3.googleusercontent.com/d/1P0a1cgn505TqICZGGjbAs-zLjuU5mveM",
    topTilt: "-1.2deg",
    bottomTilt: "1.5deg",
  },
  {
    top: "https://lh3.googleusercontent.com/d/1kCd7fivb_jSuq_NTAO5-dzn0JdEIGgHH",
    bottom: "https://lh3.googleusercontent.com/d/1YtSBpG9RDwviRB2hS0srsETMgN0DLpuH",
    topTilt: "-1.2deg",
    bottomTilt: "1.5deg",
  },
  {
    top: "https://lh3.googleusercontent.com/d/1eWTK0lFEF_pM56EoVZdo3jV1uOkDQVQH",
    bottom: "https://lh3.googleusercontent.com/d/1UwfdQSwY0TYpjvLXnRBX9e_sJ16bEMOp",
    topTilt: "-1.2deg",
    bottomTilt: "1.5deg",
  },
  {
    top: "https://lh3.googleusercontent.com/d/1T9t06tAPASbLSJzqEAvLrUnqglhYS_x0",
    bottom: "https://lh3.googleusercontent.com/d/1_S4g40Khnt_elannIab7e1FDt5bg-Ggv",
    topTilt: "-1.2deg",
    bottomTilt: "1.5deg",
  },
  {
    top: "https://lh3.googleusercontent.com/d/1g1RR40yFldWYav5qRWoMEfl7GKsN-4_-",
    bottom: "https://lh3.googleusercontent.com/d/1UOyO9XCn-geaaKHkLvnw0Ai5kg7VVWom",
    topTilt: "-1.2deg",
    bottomTilt: "1.5deg",
  },
  {
    top: "https://lh3.googleusercontent.com/d/1QsZQYatDOtm9d-Ri1bpYS-jYq_z9Ek6x",
    bottom: "https://lh3.googleusercontent.com/d/1TWxbcNMke1VMtsqNxoEBHITHQDsv-CTr",
    topTilt: "-1.2deg",
    bottomTilt: "1.5deg",
  },
  {
    top: "https://lh3.googleusercontent.com/d/1hEsXCQU-YWZ9X5RsUedi9ayD8oCAgVIo",
    bottom: "https://lh3.googleusercontent.com/d/1b8qYf1GvAhbx-C40Xce3FdGNjieKIbXM",
    topTilt: "-1.2deg",
    bottomTilt: "1.5deg",
  },
  {
    top: "https://lh3.googleusercontent.com/d/1O39x5oPFOkPpitPt66-AKK7v292icSmd",
    bottom: "https://lh3.googleusercontent.com/d/1HYN2N4FxZLNcWQs2Ou46JpYfnSPtsWuf",
    topTilt: "-1.2deg",
    bottomTilt: "1.5deg",
  },
  {
    top: "https://lh3.googleusercontent.com/d/1S90pm4L5ufXhxlp6Oa3lpNaFjoQlI516",
    bottom: "https://lh3.googleusercontent.com/d/14evBxaL7kq9mQrPCnbG4dgqnZMpwBef_",
    topTilt: "-1.2deg",
    bottomTilt: "1.5deg",
  },
  {
    top: "https://lh3.googleusercontent.com/d/1AGEkHqZHEzJu55cp8M-SRFgpvMn22IBa",
    bottom: "https://lh3.googleusercontent.com/d/1PP3mWd5pVYz9XPi-IV6X8JdPXrIgGAP0",
    topTilt: "-1.2deg",
    bottomTilt: "1.5deg",
  },
  {
    top: "https://lh3.googleusercontent.com/d/1T6yhYx9HXFL_FyeOA2PCXCXSoP6DtgF7",
    bottom: "https://lh3.googleusercontent.com/d/1jNdqNmBQlGzPgQLnJDwC6Blgqe-230au",
    topTilt: "-1.2deg",
    bottomTilt: "1.5deg",
  },
  {
    top: "https://lh3.googleusercontent.com/d/1T1Ia-Elh8BLRS6DL5Tn8ZyD-9xxLTlP1",
    bottom: "https://lh3.googleusercontent.com/d/1OCO7AryXH0zilvOK4kga0HLfH0vSgKIf",
    topTilt: "-1.2deg",
    bottomTilt: "1.5deg",
  },
  {
    top: "https://lh3.googleusercontent.com/d/1Q3xmPIrk-x2TA5LCWeuyoyozlqHlPBB-",
    bottom: "https://lh3.googleusercontent.com/d/1DKkrH3qTCny3eovMH-_Ifo3W8eXPcaeZ",
    topTilt: "-1.2deg",
    bottomTilt: "1.5deg",
  },
  {
    top: "https://lh3.googleusercontent.com/d/1YHkrClwQnj3VRHxK-4oVUtTsbQ5RpBP9",
    bottom: "https://lh3.googleusercontent.com/d/1xj5WUMRBCUVikthWcnE941g9Qux_lC3F",
    topTilt: "-1.2deg",
    bottomTilt: "1.5deg",
  },
  {
    top: "https://lh3.googleusercontent.com/d/1M5frU3Iwkhs_9_chmrCP38yowLvCdYKm",
    bottom: "https://lh3.googleusercontent.com/d/1MYSwHpxKSDCGDX7IruyH0ZYmbSm89QWK",
    topTilt: "-1.2deg",
    bottomTilt: "1.5deg",
  },
  {
    top: "https://lh3.googleusercontent.com/d/1KdK-n0HnNMcZMJUqnSk9TCNklNZpN_yl",
    bottom: "https://lh3.googleusercontent.com/d/1Y5W0MUIfPEw7Zb4wwrHpHI4OJ4EaHBK7",
    topTilt: "-1.2deg",
    bottomTilt: "1.5deg",
  },
  {
    top: "https://lh3.googleusercontent.com/d/1ITZ-9_O3bEYt-a74a4YLV12ezWBhTaC0",
    bottom: "https://lh3.googleusercontent.com/d/13C9L6NM3OOwI4ML7x6jte2mphU2jrgGF",
    topTilt: "-1.2deg",
    bottomTilt: "1.5deg",
  },
  {
    top: "https://lh3.googleusercontent.com/d/1JfLcm__1ago81qv6LW_RjULg5CGCFeNf",
    bottom: "https://lh3.googleusercontent.com/d/1hIemVQo1xvE89u0Dzc56hAw3chnKLVrH",
    topTilt: "-1.2deg",
    bottomTilt: "1.5deg",
  },
  {
    top: "https://lh3.googleusercontent.com/d/1gvyO8PrQ5JFLYhaBpCjE9Kn3BmxtZRty",
    bottom: "https://lh3.googleusercontent.com/d/1BN0OEz5AtAB5bjkMJeOO-kCsSKIZmchG",
    topTilt: "-1.2deg",
    bottomTilt: "1.5deg",
  },
  {
    top: "https://lh3.googleusercontent.com/d/1DgTct55Mw0CUhcweJlrXqGgfat1hK5Xm",
    bottom: "https://lh3.googleusercontent.com/d/1OTBhVyYRTGdy4I_X8125zizeEhqZ78cL",
    topTilt: "-1.2deg",
    bottomTilt: "1.5deg",
  },
  {
    top: "https://lh3.googleusercontent.com/d/124LiUr_bHd3hUxAFHVWqsV1LE7OZ-Wxi",
    bottom: "https://lh3.googleusercontent.com/d/14tqI8QLR3Thd57SzW5OYmHvQiXZA6pJK",
    topTilt: "-1.2deg",
    bottomTilt: "1.5deg",
  },
  {
    top: "https://lh3.googleusercontent.com/d/10j2iph7OoxPJUJp5XRWg9VAfO9dMbfnG",
    bottom: "https://lh3.googleusercontent.com/d/1ZzNUvI44byts3Qx27WocYwPxMayMg1Dj",
    topTilt: "-1.2deg",
    bottomTilt: "1.5deg",
  },
  {
    top: "https://lh3.googleusercontent.com/d/1vXOtKB0dFK2nOptDSrIdRA7a6jPm_prw",
    bottom: "https://lh3.googleusercontent.com/d/1A_GCTbRsQfSReHgwu2QtCh25tbf-PrZS",
    topTilt: "-1.2deg",
    bottomTilt: "1.5deg",
  },
  {
    top: "https://lh3.googleusercontent.com/d/13Xgr1mIY306n54_k_t6u6nz0j25tzZC7",
    bottom: "https://lh3.googleusercontent.com/d/1L3MQASdEao8wLzYzErFszD6CZpBk7O-S",
    topTilt: "-1.2deg",
    bottomTilt: "1.5deg",
  },
  {
    top: "https://lh3.googleusercontent.com/d/1sYfEvSeKkIJihCXUJKnOpIatXyGzG7dC",
    bottom: "https://lh3.googleusercontent.com/d/1Y1dlOGT4qVXeTMsY2qH7pFRJLpl4yMDJ",
    topTilt: "-1.2deg",
    bottomTilt: "1.5deg",
  },
  {
    top: "https://lh3.googleusercontent.com/d/1hN2THVkPP6-7qsBRJwmXidLF-YwZlLjx",
    bottom: "https://lh3.googleusercontent.com/d/1H3WQ6KR2pVQFwy13TK0ab7SHVs4sOBcJ",
    topTilt: "-1.2deg",
    bottomTilt: "1.5deg",
  },
  {
    top: "https://lh3.googleusercontent.com/d/1aXhBlFn30CmKBF5ZUcnTIsBOYj-EJF2u",
    bottom: "https://lh3.googleusercontent.com/d/15C7ur_QI9zE8TP5r0MnvKdV6ybupEUAh",
    topTilt: "-1.2deg",
    bottomTilt: "1.5deg",
  },
  {
    top: "https://lh3.googleusercontent.com/d/1ixwDQeI3L4Jkgxq89K3vbkuVlXJlptGN",
    bottom: "https://lh3.googleusercontent.com/d/1z0Gph2-LZj1EvO6oC3P1DCC4pwDGpGTf",
    topTilt: "-1.2deg",
    bottomTilt: "1.5deg",
  },
  {
    top: "https://lh3.googleusercontent.com/d/1xrkcs9QC2IQ6TEYeQnkia7iY6PFCntiz",
    bottom: "https://lh3.googleusercontent.com/d/14IgX11r-pCOerKSeKdJAPV5SqvlczOAw",
    topTilt: "-1.2deg",
    bottomTilt: "1.5deg",
  },
  {
    top: "https://lh3.googleusercontent.com/d/1ek9y6tYehTT4khfnm-s6_EFB1p6Vi1oi",
    bottom: "https://lh3.googleusercontent.com/d/141m7Nmev4YoaZvqEJA6rX95RnzryzsqK",
    topTilt: "-1.2deg",
    bottomTilt: "1.5deg",
  },
  {
    top: "https://lh3.googleusercontent.com/d/1l_-AZgDn31ZO-wsT4KkQITEnGfLbKTZb",
    bottom: "https://lh3.googleusercontent.com/d/1RO9TyXH1XAZDOjbyuDpMdW5yeEyk-1h_",
    topTilt: "-1.2deg",
    bottomTilt: "1.5deg",
  },
  {
    top: "https://lh3.googleusercontent.com/d/1CWiUNBX2yNncD5m-nKF9yCz6CsflplTh",
    bottom: "https://lh3.googleusercontent.com/d/1yE2O4ra-WvZDM1VEFq31891BzzmiCwVP",
    topTilt: "-1.2deg",
    bottomTilt: "1.5deg",
  },
  {
    top: "https://lh3.googleusercontent.com/d/1sZn0wFNb7Sfb8vBdsTDC40HP9N3cRmrh",
    bottom: "https://lh3.googleusercontent.com/d/1bkPELm984z8Kd0E4OajiKU4N9zmXJyXP",
    topTilt: "-1.2deg",
    bottomTilt: "1.5deg",
  },
  {
    top: "https://lh3.googleusercontent.com/d/1ZRrqa4bViBII9O0qK7xh4h6qakTlrjUJ",
    bottom: "https://lh3.googleusercontent.com/d/1Tp5EOATrIW2H0ZTjfPKtOg5uynR7NCwD",
    topTilt: "-1.2deg",
    bottomTilt: "1.5deg",
  },
  {
    top: "https://lh3.googleusercontent.com/d/1KFmJig35maZRYrU4tVj3axctJbOBtnDn",
    bottom: "https://lh3.googleusercontent.com/d/1UzLtd2K_pgsX2Y-9ClV3K3jmB-jG1SQK",
    topTilt: "-1.2deg",
    bottomTilt: "1.5deg",
  },
  {
    top: "https://lh3.googleusercontent.com/d/1dXOsczP05k_GCYkKXggTXnWGN03sQM2J",
    bottom: "https://lh3.googleusercontent.com/d/1RNIuBJYLJhs6Iz9R7s0-YiqpoFDPMrDJ",
    topTilt: "-1.2deg",
    bottomTilt: "1.5deg",
  },
  {
    top: "https://lh3.googleusercontent.com/d/10dQxJPDlUYCF6cCz_j9oa8JgQiYMwMqM",
    bottom: "https://lh3.googleusercontent.com/d/10YJA4jwoPJE6Ft8ZpZMkYw65zRxaL_Yb",
    topTilt: "-1.2deg",
    bottomTilt: "1.5deg",
  },
  {
    top: "https://lh3.googleusercontent.com/d/1wMHGVcz-aTXJlnEV9j3SD45fGINaUXcR",
    bottom: "https://lh3.googleusercontent.com/d/14FW2WDRXfDglAnE6_cGwnShuyXv93MoA",
    topTilt: "-1.2deg",
    bottomTilt: "1.5deg",
  },
  {
    top: "https://lh3.googleusercontent.com/d/1-iSN2s5D8ZBqUcYe7solJb4Wlod889ya",
    bottom: "https://lh3.googleusercontent.com/d/1zXhfz7uQLvVQc02Vs3_8FVokbFQ6nF-X",
    topTilt: "-1.2deg",
    bottomTilt: "1.5deg",
  },
  {
    top: "https://lh3.googleusercontent.com/d/1-bmaMlTDeqHI-CQ3g2a2tqdMzS-DYttt",
    bottom: "https://lh3.googleusercontent.com/d/1OiaojKm2TN2HSOYWIe6rgRyTm4tKLGVB",
    topTilt: "-1.2deg",
    bottomTilt: "1.5deg",
  },
  {
    top: "https://lh3.googleusercontent.com/d/1-MjrNCBBbhHNJ4McnzfvumLE2gSVwQrX",
    bottom: "https://lh3.googleusercontent.com/d/1v7TWDljp7O9cx-904TGBNLgsfqrr_GWm",
    topTilt: "-1.2deg",
    bottomTilt: "1.5deg",
  },
  {
    top: "https://lh3.googleusercontent.com/d/1aGaDIEywRUq0e6atFrmMRbmYHJojwRhU",
    bottom: "https://lh3.googleusercontent.com/d/1VV9IHFaULxzWBL2RJgYBi5Gv3hEnZVei",
    topTilt: "-1.2deg",
    bottomTilt: "1.5deg",
  },
  "end",
];
// ───────────────────────────────────────────────────────────────

const BOOK_W = 360;
const BOOK_H = 500;
const SPINE_W = 22;
const PAGE_W = BOOK_W - SPINE_W;

const paperBg = "#fff5f8";
const paperBg2 = "#fde8f0";

// Inject Google Fonts
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Jost:wght@300;400&display=swap";
if (!document.head.querySelector("[href*='Cormorant']")) {
  document.head.appendChild(fontLink);
}

function CoverPage() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background:
          "linear-gradient(155deg, #f9d0e0 0%, #e8a0b8 35%, #d4789a 65%, #c0527c 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 12,
          border: "1px solid rgba(255,230,240,0.35)",
          borderRadius: 3,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 18,
          border: "1px solid rgba(255,230,240,0.15)",
          borderRadius: 2,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          width: 110,
          height: 110,
          borderRadius: "50%",
          border: "3px solid rgba(255,230,240,0.6)",
          boxShadow:
            "0 0 0 5px rgba(255,200,225,0.2), 0 4px 20px rgba(150,60,90,0.3)",
          overflow: "hidden",
          background:
            "linear-gradient(135deg, rgba(255,220,235,0.4), rgba(255,180,210,0.3))",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={COVER_PHOTO}
          alt="Mama"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
          onError={(e) => {
            e.target.style.display = "none";
            e.target.parentNode.innerHTML =
              '<span style="font-size:36px">🌸</span>';
          }}
        />
      </div>

      <span
        style={{
          color: "rgba(255,240,248,0.95)",
          fontSize: 24,
          letterSpacing: 4,
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontWeight: 400,
          fontStyle: "italic",
          textShadow: "0 1px 6px rgba(140,50,80,0.3)",
        }}
      >
        Mama's Album
      </span>

      <span
        style={{
          color: "rgba(255,225,238,0.8)",
          fontSize: 9,
          letterSpacing: 5,
          textTransform: "uppercase",
          fontFamily: "'Jost', sans-serif",
          fontWeight: 300,
          textShadow: "0 1px 4px rgba(140,50,80,0.2)",
        }}
      >
        a mother's day special
      </span>

      <span
        style={{
          position: "absolute",
          bottom: 18,
          color: "rgba(255,220,235,0.7)",
          fontSize: 9,
          letterSpacing: 4,
          textTransform: "uppercase",
          fontFamily: "'Jost', sans-serif",
          fontWeight: 300,
        }}
      >
        swipe to open →
      </span>
    </div>
  );
}

function EndPage({ onClose }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: `linear-gradient(145deg, ${paperBg} 0%, ${paperBg2} 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        padding: "0 16px",
        boxSizing: "border-box",
      }}
    >
      <span style={{ color: "#d4789a", fontSize: 30, fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
        ❧
      </span>
      <span
        style={{
          color: "#a85070",
          fontSize: 15,
          letterSpacing: 3,
          fontStyle: "italic",
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontWeight: 400,
          textAlign: "center",
          lineHeight: 1.6,
        }}
      >
        thank you for flipping through these pages with us, mama
      </span>
      <span
        style={{
          color: "#b87090",
          fontSize: 10,
          letterSpacing: 2,
          fontFamily: "'Jost', sans-serif",
          fontWeight: 300,
        }}
      >
        - Jake & Maxinne
      </span>

      {/* Close button */}
      <div style={{ marginTop: 16 }}>
        <button
          onClick={onClose}
          style={{
            background: "linear-gradient(135deg, #e8a0b8, #c86090)",
            border: "none",
            color: "rgba(255,240,248,0.95)",
            fontFamily: "'Jost', sans-serif",
            fontWeight: 400,
            fontSize: 9,
            letterSpacing: 4,
            textTransform: "uppercase",
            padding: "10px 24px",
            borderRadius: 100,
            cursor: "pointer",
            boxShadow: "0 4px 16px rgba(180,80,110,0.3)",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 8px 24px rgba(180,80,110,0.4)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 16px rgba(180,80,110,0.3)";
          }}
        >
          close the album
        </button>
      </div>
    </div>
  );
}

function PhotoPage({ data, onPhotoClick }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: `linear-gradient(145deg, ${paperBg} 0%, ${paperBg2} 100%)`,
        display: "flex",
        flexDirection: "column",
        padding: "12px",
        gap: 8,
        boxSizing: "border-box",
      }}
    >
      {[
        { src: data.top, tilt: data.topTilt || "-1deg" },
        { src: data.bottom, tilt: data.bottomTilt || "1deg" },
      ].map((photo, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 0,
          }}
        >
          <div
            onClick={() => onPhotoClick && onPhotoClick(photo.src)}
            style={{
              background: "#fff",
              padding: "5px 5px 20px 5px",
              boxShadow: "0 2px 10px rgba(180,80,110,0.15), 0 1px 3px rgba(180,80,110,0.1)",
              transform: `rotate(${photo.tilt})`,
              width: "100%",
              height: "100%",
              boxSizing: "border-box",
              cursor: "pointer",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = `rotate(${photo.tilt}) scale(1.03)`;
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(180,80,110,0.28), 0 2px 6px rgba(180,80,110,0.15)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = `rotate(${photo.tilt})`;
              e.currentTarget.style.boxShadow = "0 2px 10px rgba(180,80,110,0.15), 0 1px 3px rgba(180,80,110,0.1)";
            }}
          >
            <img
              src={photo.src}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                display: "block",
              }}
              loading="lazy"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function PageContent({ index, onPhotoClick, onClose }) {
  const data = pages[index];
  if (data == null)
    return (
      <div style={{ width: "100%", height: "100%", background: `linear-gradient(145deg, ${paperBg}, ${paperBg2})` }} />
    );
  if (data === "cover") return <CoverPage />;
  if (data === "end") return <EndPage onClose={onClose} />;
  return <PhotoPage data={data} onPhotoClick={onPhotoClick} />;
}

function BackgroundMusic({ playing }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (!playing || !audioRef.current) return;
    audioRef.current.volume = 0.5;
    audioRef.current.play().catch((err) => console.log("❌ Music error:", err));
  }, [playing]);

  return (
    <audio
      ref={audioRef}
      src="https://res.cloudinary.com/dgd7zzp5t/video/upload/q_auto/f_auto/v1778087026/Yesterday_Once_More_1_xrjnpj.mp3"
      loop
      preload="auto"
      style={{ display: "none" }}
    />
  );
}

function Album() {
  const [displayIndex, setDisplayIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const animIndexRef = useRef(null);
  const underIndexRef = useRef(0);
  const rotationRef = useRef(0);
  const animDivRef = useRef(null);
  const touchStartX = useRef(null);
  const total = pages.length;
  const [, forceUpdate] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [photoZoomed, setPhotoZoomed] = useState(false);
  const [closing, setClosing] = useState(false);

  const handleClose = useCallback(() => {
  setClosing(true);
  setTimeout(() => {
    setDisplayIndex(0);
    setClosing(false);
  }, 700);
}, []);

  const doTurn = useCallback(
    (dir) => {
      const next = displayIndex + dir;
      if (next < 0 || next >= total || animating) return;

      if (dir === 1) {
        animIndexRef.current = displayIndex;
        underIndexRef.current = next;
        rotationRef.current = 0;
      } else {
        animIndexRef.current = next;
        underIndexRef.current = displayIndex;
        rotationRef.current = -180;
      }

      setAnimating(true);
      forceUpdate((n) => n + 1);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (animDivRef.current) {
            animDivRef.current.style.transition =
              "transform 0.65s cubic-bezier(0.645, 0.045, 0.355, 1.000)";
            animDivRef.current.style.transform = `rotateY(${dir === 1 ? -180 : 0}deg)`;
          }
        });
      });
    },
    [displayIndex, animating, total]
  );

  const onTransitionEnd = useCallback(() => {
    if (animDivRef.current) {
      animDivRef.current.style.transition = "none";
    }
    setDisplayIndex(
      underIndexRef.current === displayIndex
        ? animIndexRef.current
        : underIndexRef.current
    );
    setAnimating(false);
    animIndexRef.current = null;
  }, [displayIndex]);

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) doTurn(diff > 0 ? 1 : -1);
  };

  const progress = total > 1 ? (displayIndex / (total - 1)) * 100 : 0;

  const petals = [
    { width: 22, height: 14, color: "#e8789a", left: "5%",  delay: "0s",   duration: "8s"   },
    { width: 14, height: 9,  color: "#c9557a", left: "18%", delay: "2.1s", duration: "11s"  },
    { width: 18, height: 12, color: "#f0a0bc", left: "33%", delay: "0.6s", duration: "9s"   },
    { width: 10, height: 7,  color: "#e8789a", left: "50%", delay: "3.4s", duration: "7s"   },
    { width: 20, height: 13, color: "#d4608a", left: "63%", delay: "1.2s", duration: "10s"  },
    { width: 13, height: 9,  color: "#f0a0bc", left: "78%", delay: "4.5s", duration: "8.5s" },
    { width: 16, height: 11, color: "#e8789a", left: "91%", delay: "0.3s", duration: "12s"  },
    { width: 11, height: 7,  color: "#c9557a", left: "42%", delay: "5s",   duration: "9.5s" },
  ];

  return (
    <>
      <style>{`
        @keyframes petalDrift {
          0%   { transform: translateY(-20px) rotate(0deg); opacity: 0; }
          10%  { opacity: 0.18; }
          90%  { opacity: 0.18; }
          100% { transform: translateY(110vh) rotate(180deg); opacity: 0; }
        }
        @keyframes pageEnterBg {
          from { opacity: 0; transform: scale(1.03); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes modalBackdropIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes modalPhotoIn {
          from { opacity: 0; transform: scale(0.88); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes polaroidGlow {
          0%, 100% { box-shadow: 0 20px 60px rgba(60,10,30,0.5), 0 4px 20px rgba(180,80,110,0.3), 0 0 0 0px rgba(212,120,154,0); }
          50%       { box-shadow: 0 20px 60px rgba(60,10,30,0.5), 0 4px 20px rgba(180,80,110,0.3), 0 0 20px 6px rgba(212,120,154,0.45); }
        } 
        @keyframes bookClose {
          0%   { opacity: 1; transform: scale(1) rotateY(0deg); }
          50%  { opacity: 0.6; transform: scale(0.92) rotateY(-15deg); }
          100% { opacity: 0; transform: scale(0.85) rotateY(-30deg); }
        }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(ellipse at 60% 20%, #fce4ec 0%, #f8bbd9 18%, #f3e5f5 45%, #fce4ec 70%, #fff0f5 100%)",
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          userSelect: "none",
          WebkitUserSelect: "none",
          touchAction: "pan-y",
          position: "relative",
          overflow: "hidden",
          animation: closing
            ? "bookClose 0.7s cubic-bezier(0.4,0,0.2,1) forwards"
            : "pageEnterBg 1s cubic-bezier(0.23,1,0.32,1) forwards",
        }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 10% 80%, rgba(248,187,208,0.35) 0%, transparent 40%), radial-gradient(circle at 90% 10%, rgba(243,229,245,0.4) 0%, transparent 35%)",
            pointerEvents: "none",
          }}
        />

        {petals.map((p, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: p.width,
              height: p.height,
              background: p.color,
              left: p.left,
              top: "-10px",
              borderRadius: "50% 0 50% 0",
              opacity: 0,
              animation: `petalDrift ${p.duration} ${p.delay} linear infinite`,
              pointerEvents: "none",
            }}
          />
        ))}

        <div style={{
          animation: "pageEnterBg 1.1s 0.2s cubic-bezier(0.23,1,0.32,1) both",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>

        <p
          style={{
            color: "#b05878",
            fontSize: 11,
            letterSpacing: 4,
            textTransform: "uppercase",
            marginBottom: 24,
            fontFamily: "'Jost', sans-serif",
            fontWeight: 400,
            position: "relative",
          }}
        >
          happy mother's day, mama!
        </p>

        <div style={{ width: BOOK_W, height: BOOK_H, position: "relative" }}>

          <div
            style={{
              position: "absolute",
              left: 0, top: 0,
              width: SPINE_W, height: "100%",
              zIndex: 30,
              background: "linear-gradient(to right, #c86090, #e8a0b8, #c86090)",
              borderRadius: "5px 0 0 5px",
              boxShadow:
                "inset -3px 0 6px rgba(180,80,110,0.3), 2px 0 8px rgba(180,80,110,0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                color: "rgba(255,240,248,0.8)",
                fontSize: 7,
                letterSpacing: 4,
                textTransform: "uppercase",
                writingMode: "vertical-rl",
                fontFamily: "'Jost', sans-serif",
                fontWeight: 400,
              }}
            >
              Mama Racqy's Memories
            </span>
          </div>

          <div
            style={{
              position: "absolute",
              left: SPINE_W, top: 10,
              width: PAGE_W, height: BOOK_H,
              background: "rgba(180,80,110,0.18)",
              borderRadius: "0 8px 8px 0",
              filter: "blur(16px)",
              zIndex: 0,
            }}
          />

          <div
            style={{
              position: "absolute",
              left: SPINE_W, top: 0,
              width: PAGE_W, height: BOOK_H,
              perspective: 1600,
              overflow: "hidden",
              borderRadius: "0 8px 8px 0",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 1,
                borderRadius: "0 8px 8px 0",
                overflow: "hidden",
              }}
            >
              <PageContent index={animating ? underIndexRef.current : displayIndex} onPhotoClick={setSelectedPhoto} onClose={handleClose} />
            </div>

            {animating && (
              <div
                ref={animDivRef}
                style={{
                  position: "absolute",
                  inset: 0,
                  transformOrigin: "left center",
                  transformStyle: "preserve-3d",
                  transform: `rotateY(${rotationRef.current}deg)`,
                  transition: "none",
                  zIndex: 2,
                  willChange: "transform",
                }}
                onTransitionEnd={onTransitionEnd}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    borderRadius: "0 8px 8px 0",
                    overflow: "hidden",
                  }}
                >
                  <PageContent index={animIndexRef.current} onPhotoClick={setSelectedPhoto} onClose={handleClose} />
                  <div
                    style={{
                      position: "absolute",
                      right: 0, top: 0,
                      width: 40, height: "100%",
                      background:
                        "linear-gradient(to right, transparent, rgba(180,80,110,0.08))",
                      pointerEvents: "none",
                    }}
                  />
                </div>

                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                    borderRadius: "0 8px 8px 0",
                    overflow: "hidden",
                    background: `linear-gradient(145deg, ${paperBg} 0%, ${paperBg2} 100%)`,
                  }}
                >
                  <div
                    style={{
                      width: "100%", height: "100%",
                      backgroundImage:
                        "repeating-linear-gradient(0deg, transparent, transparent 31px, rgba(180,80,110,0.04) 31px, rgba(180,80,110,0.04) 32px)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      left: 0, top: 0,
                      width: 40, height: "100%",
                      background:
                        "linear-gradient(to left, transparent, rgba(180,80,110,0.06))",
                      pointerEvents: "none",
                    }}
                  />
                </div>
              </div>
            )}

          </div>
        </div>

        <div style={{ marginTop: 28, width: PAGE_W, position: "relative" }}>
          <div
            style={{
              width: "100%",
              height: 2,
              background: "rgba(180,80,110,0.15)",
              borderRadius: 2,
              position: "relative",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                background:
                  "linear-gradient(to right, rgba(180,80,110,0.3), rgba(180,80,110,0.75))",
                borderRadius: 2,
                transition: "width 0.5s ease",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: `${progress}%`,
                transform: "translate(-50%, -50%)",
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#d4789a",
                boxShadow: "0 0 10px rgba(212,120,154,0.55)",
                transition: "left 0.5s ease",
              }}
            />
          </div>

          <p
            style={{
              textAlign: "center",
              marginTop: 12,
              color: "#a05070",
              fontSize: 10,
              letterSpacing: 3,
              textTransform: "uppercase",
              fontFamily: "'Jost', sans-serif",
              fontWeight: 400,
            }}
          >
            {displayIndex === 0
              ? "cover"
              : displayIndex >= total - 1
              ? "the end"
              : `${displayIndex} / ${total - 2}`}
          </p>
        </div>

        <p
          style={{
            marginTop: 8,
            color: "#b06080",
            fontSize: 9,
            letterSpacing: 3,
            textTransform: "uppercase",
            fontFamily: "'Jost', sans-serif",
            fontWeight: 400,
          }}
        >
          swipe left or right to turn pages
        </p>
      </div>
      </div>
      {selectedPhoto && (
  <div
    onClick={() => { setSelectedPhoto(null); setPhotoZoomed(false); }}
    style={{
      position: "fixed",
      inset: 0,
      zIndex: 100,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "rgba(60, 10, 30, 0.72)",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
      animation: "modalBackdropIn 0.3s ease forwards",
      padding: 24,
    }}
  >
    {/* Decorative corner flowers */}
    {["top:16px;left:16px", "top:16px;right:16px", "bottom:16px;left:16px", "bottom:16px;right:16px"].map((pos, i) => (
      <span key={i} style={{
        position: "absolute",
        ...Object.fromEntries(pos.split(";").map(p => p.split(":"))),
        fontSize: 18,
        opacity: 0.5,
        pointerEvents: "none",
      }}>✿</span>
    ))}

    {/* Close button */}
    <button
      onClick={() => { setSelectedPhoto(null); setPhotoZoomed(false); }}
      style={{
        position: "absolute",
        top: 20, right: 20,
        background: "rgba(255,220,235,0.15)",
        border: "1px solid rgba(255,200,225,0.3)",
        color: "rgba(255,220,240,0.9)",
        width: 36, height: 36,
        borderRadius: "50%",
        fontSize: 18,
        cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        backdropFilter: "blur(4px)",
        zIndex: 101,
        transition: "background 0.2s",
      }}
    >
      ×
    </button>

    {/* Hint text */}
    <p style={{
      position: "absolute",
      bottom: 20,
      color: "rgba(255,210,230,0.6)",
      fontSize: 9,
      letterSpacing: 3,
      textTransform: "uppercase",
      fontFamily: "'Jost', sans-serif",
      fontWeight: 300,
      pointerEvents: "none",
    }}>
      do you remember this picture, mama?
    </p>

    {/* Photo polaroid */}
    <div
      onClick={e => { e.stopPropagation(); setPhotoZoomed(z => !z); }}
      style={{
        background: "#fff",
        padding: "10px 10px 36px 10px",
        animation: "modalPhotoIn 0.35s cubic-bezier(0.23,1,0.32,1) forwards, polaroidGlow 2.2s 0.35s ease-in-out infinite",
        maxWidth: photoZoomed ? "95vw" : "85vw",
        maxHeight: photoZoomed ? "90vh" : "75vh",
        transition: "max-width 0.3s ease, max-height 0.3s ease",
        cursor: photoZoomed ? "zoom-out" : "zoom-in",
        position: "relative",
      }}
    >

      <img
        src={selectedPhoto}
        alt=""
        style={{
          display: "block",
          maxWidth: "100%",
          maxHeight: photoZoomed ? "80vh" : "65vh",
          objectFit: "contain",
          transition: "max-height 0.3s ease",
        }}
      />

      {/* Zoom icon hint */}
      <div style={{
        position: "absolute",
        bottom: 8,
        left: "50%",
        transform: "translateX(-50%)",
        color: "rgba(180,80,110,0.45)",
        fontSize: 10,
        fontFamily: "'Jost', sans-serif",
        letterSpacing: 2,
      }}>
        {photoZoomed ? "−" : "+"}
      </div>
    </div>
  </div>
)}
    </>
  );
}

export default function App() {
  const [entered, setEntered] = useState(false);
  if (!entered) return <WelcomePage onEnter={() => setEntered(true)} />;
  return (
    <>
      <BackgroundMusic playing={true} />
      <Album />
    </>
  );
}