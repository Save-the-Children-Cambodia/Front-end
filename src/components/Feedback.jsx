import React from "react";
import '../assets/style/Feedbacks.css';
import linkedin from '../assets/img/tiktok.svg';
import facebook from '../assets/img/facebook.svg';
import youtube from '../assets/img/youtube.svg';
import x from '../assets/img/telegram.svg';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';


const Feedback = () => {
    return (
        <div className="container-feedback">
            <div className="container-feedback-about">
                <p className="feedback-title">អំពីពួកយើង</p>
                <p className="describe-aboutme">សូមស្វាគមន៍មកកាន់គេហទំព័រ Positive Parenting ដែលជាគេហទំព័រដ៏ទូលំទូលាយដែលផ្សព្វផ្សាយដល់ការចិញ្ចឹមបីបាច់ថែរក្សា និងគាំទ្រដល់កុមារ។ បេសកកម្មរបស់យើងគឺដើម្បីជួយឪពុកម្តាយ និងអ្នកថែទាំបង្កើតបរិយាកាសប្រកបដោយក្តីស្រឡាញ់ ភាពកក់ក្តៅ និងចិត្តល្អ ដែលកុមារអាចលូតលាស់បានល្អ។
                </p>
                <div className="container-feedback-icon">
                    <svg className="facebook" version="1.0" xmlns="http://www.w3.org/2000/svg"
                                    width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000"
                                    preserveAspectRatio="xMidYMid meet">

                                    <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                                    fill="#fff" stroke="none">
                                    <path d="M2370 5113 c-371 -35 -653 -114 -961 -269 -406 -203 -782 -548 -1029
                                    -944 -179 -286 -309 -655 -362 -1025 -17 -118 -17 -512 0 -630 42 -295 120
                                    -553 242 -800 137 -280 272 -468 494 -691 221 -220 412 -357 681 -489 188 -92
                                    309 -137 500 -185 500 -126 1002 -102 1490 71 149 53 407 182 540 271 365 243
                                    667 578 866 963 181 348 271 694 286 1090 15 426 -73 832 -263 1214 -124 250
                                    -263 447 -458 648 -216 224 -428 378 -711 518 -296 146 -572 225 -900 255
                                    -102 9 -333 11 -415 3z m868 -1410 l2 -251 -182 -4 c-277 -5 -278 -6 -278
                                    -283 l0 -175 235 0 c129 0 235 -1 235 -3 0 -2 -11 -110 -25 -241 -14 -131 -25
                                    -247 -25 -257 0 -18 -10 -19 -210 -19 l-210 0 0 -740 0 -740 -310 0 -310 0 0
                                    740 0 740 -145 0 -145 0 0 260 0 260 144 0 144 0 5 233 c5 263 15 319 82 445
                                    82 157 233 256 427 281 34 5 176 8 313 7 l250 -1 3 -252z"/>
                                    </g>
                    </svg>
                    <svg className="youtube" version="1.0" xmlns="http://www.w3.org/2000/svg"
                        width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000"
                        preserveAspectRatio="xMidYMid meet">

                        <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                        fill="#fff" stroke="none">
                        <path d="M2321 5110 c-868 -84 -1644 -610 -2037 -1382 -139 -273 -221 -536
                        -266 -853 -20 -140 -17 -504 6 -660 39 -278 121 -541 247 -794 249 -502 647
                        -900 1150 -1150 815 -406 1779 -350 2539 147 297 194 579 482 771 788 74 116
                        184 342 234 478 51 138 110 376 131 531 23 157 26 521 6 660 -59 415 -191 769
                        -410 1099 -92 140 -185 254 -315 385 -399 403 -895 653 -1462 737 -122 18
                        -466 26 -594 14z m1210 -1606 c187 -55 325 -202 364 -389 21 -102 21 -1008 0
                        -1110 -39 -187 -178 -334 -364 -389 -48 -14 -161 -16 -971 -16 -810 0 -923 2
                        -971 16 -187 55 -325 202 -364 389 -21 102 -21 1008 0 1110 39 183 162 320
                        345 382 l65 22 921 1 c814 0 927 -2 975 -16z"/>
                        <path d="M2200 2561 c0 -226 2 -411 5 -411 10 0 705 405 705 410 -1 5 -681
                        402 -700 408 -7 2 -10 -142 -10 -407z"/>
                        </g>
                    </svg>
                    <svg className="telegram" version="1.0" xmlns="http://www.w3.org/2000/svg"
                        width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000"
                        preserveAspectRatio="xMidYMid meet">

                        <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                        fill="#fff" stroke="none">
                        <path d="M2315 5109 c-641 -66 -1211 -353 -1649 -829 -618 -671 -825 -1644
                        -536 -2520 131 -397 338 -729 641 -1027 402 -395 890 -632 1474 -715 119 -17
                        512 -16 635 1 586 81 1091 331 1497 742 404 409 641 894 725 1484 17 118 17
                        512 0 630 -48 337 -146 641 -295 910 -117 213 -253 395 -430 574 -398 403
                        -893 653 -1462 737 -123 18 -478 26 -600 13z m1440 -1543 c44 -19 65 -61 65
                        -131 0 -64 -423 -2072 -445 -2116 -32 -62 -101 -85 -171 -59 -24 9 -255 176
                        -593 427 l-84 62 -181 -173 c-133 -126 -191 -176 -215 -181 -18 -4 -35 -5 -37
                        -2 -3 3 4 148 16 324 l21 318 71 65 c38 36 309 281 601 545 293 265 532 487
                        532 495 0 11 -11 15 -35 14 -29 -1 -177 -90 -777 -467 -407 -257 -746 -467
                        -752 -467 -27 0 -658 203 -688 221 -64 40 -50 99 33 146 22 12 181 77 354 143
                        173 67 500 193 725 280 226 87 628 242 895 345 585 226 579 224 608 225 12 0
                        38 -6 57 -14z"/>
                        </g>
                    </svg>
                    <svg className="tiktok" version="1.0" xmlns="http://www.w3.org/2000/svg"
                        width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000"
                        preserveAspectRatio="xMidYMid meet">

                        <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                        fill="#fff" stroke="none">
                        <path d="M2315 5109 c-800 -83 -1501 -518 -1927 -1196 -604 -960 -491 -2229
                        272 -3065 423 -463 951 -740 1585 -830 118 -17 511 -16 635 0 579 80 1097 337
                        1491 739 130 132 157 163 243 277 256 341 423 757 488 1211 17 118 17 512 0
                        630 -43 303 -122 561 -247 814 -134 268 -270 459 -483 674 -395 400 -889 649
                        -1457 733 -123 18 -478 26 -600 13z m790 -1136 c22 -171 76 -302 170 -416 122
                        -148 304 -243 502 -263 l63 -7 0 -236 0 -236 -94 6 c-52 4 -120 13 -151 19
                        -136 28 -310 102 -427 181 -31 22 -59 39 -62 39 -2 0 -4 -264 -3 -587 2 -582
                        2 -589 -21 -678 -83 -326 -333 -580 -657 -666 -120 -31 -294 -36 -415 -11
                        -361 74 -641 350 -715 703 -20 92 -19 270 1 367 17 85 64 203 116 289 44 73
                        166 204 242 258 174 123 411 190 606 170 l70 -7 0 -243 0 -243 -37 10 c-21 6
                        -78 8 -128 6 -114 -5 -200 -43 -278 -123 -249 -253 -108 -673 245 -728 230
                        -36 454 133 488 368 6 42 10 465 10 1073 l0 1002 234 0 235 0 6 -47z"/>
                        </g>
                    </svg>
                </div>
            </div>
        <div className="container-feedback-report class-feedback">
            <p className="feedback-title">មតិយបល់បន្ថែម</p>
            <Stack className="hey-hey-hey">
                <div className="container-feedback-input-identify">
                    <Autocomplete
                        id="free-solo-demo"
                        freeSolo
                        options={top100Films.map((option) => option.title)}
                        renderInput={(params) => 
                        <TextField 
                            {...params} 
                            label="អុីម៉ែល" 
                            type="email"
                        />}
                    />
                    <p className="or-or-or">ឬ</p>
                    <Autocomplete
                        freeSolo
                        id="free-solo-2-demo"
                        disableClearable
                        options={top100Films.map((option) => option.title)}
                        renderInput={(params) => (
                        <TextField
                            {...params}
                            label="លេខទូរស័ព្ទ"
                            InputProps={{
                            ...params.InputProps,
                            type: 'search',
                            }}
                        />
                        )}
                    />
                </div>
            </Stack>
            <Stack className="hey-hey-hey">
                <div className="container-feedback-input-identify">
                    <Autocomplete
                        id="free-solo-demoddd"
                        freeSolo
                        options={top100Films.map((option) => option.title)}
                        renderInput={(params) => 
                        <TextField 
                            {...params} 
                            label="Text Here..." 
                            type="email"
                        />}
                    />
                </div>
            </Stack>
        </div>
        </div>
    );
}

const top100Films = [
    
    // { title: 'Pulp Fiction', year: 1994 },
    // {
    //   title: 'The Lord of the Rings: The Return of the King',
    //   year: 2003,
    // }
  ];

export default Feedback