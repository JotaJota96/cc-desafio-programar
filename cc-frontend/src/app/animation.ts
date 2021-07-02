import { animate, style, transition, trigger } from "@angular/animations";

export const inCardAnimation = [
  trigger(
    'inCardAnimation', 
    [
      transition(
        ':enter', 
        [
          style({ opacity: 0, transform: 'translateY(100px)' }),
          animate('0.3s {{ delay }}s cubic-bezier(0.35, 0, 0.25, 1)', 
                  style({ opacity: 1,transform: 'translateY(0px)' }))
        ],
        { params : { delay: "0" }}
      )
    ]
  )
];

export const inTitleAnimation = [
  trigger(
    'inTitleAnimation', 
    [
      transition(
        ':enter', 
        [
          style({ opacity: 0, transform: 'translateX(30px)' }),
          animate('0.3s cubic-bezier(0.35, 0, 0.25, 1)', 
                  style({ opacity: 1,transform: 'translateX(0)' }))
        ]
      )
    ]
  )
];

export const inInfoAnimation = [
  trigger(
    'inInfoAnimation', 
    [
      transition(
        ':enter', 
        [
          style({ opacity: 0 }),
          animate('0.3s {{ delay }}s cubic-bezier(0.35, 0, 0.25, 1)', 
                  style({ opacity: 1 }))
        ],
        { params : { delay: "0" }}
      )
    ]
  )
];