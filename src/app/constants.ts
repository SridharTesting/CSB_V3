export const constant = {
    sidebarDemoLinks: [
        
        
        {
            label: 'Configuration',
                    
            
            faIcon: 'fa fa-sitemap',
            
            items: [
                {
                    label: 'Org Setup',
                    
                    routerLink: ['orgSetUp'],
                    faIcon: 'fa fa-sitemap',
                    expandCollapseStatus:true
                   
                },
                {
                    label: 'LOB Setup',
                    
                    routerLink: ['loBsetup'],
                    faIcon: 'fa fa-sitemap',
                    expandCollapseStatus:true
                },
                {
                    label: 'User Setup',
                    
                    routerLink: ['userSetup'],
                    faIcon: 'fa fa-sitemap',
                    expandCollapseStatus:true
                    
                   
                },
                {
                    label: 'Business Process Setup',
                    
                    faIcon: 'fa fa-sitemap',
                    
                    items: [
                            {
                                label: 'Business Process Level1 Setup',
                                routerLink:  ['busproc1SetUp'],
                                faIcon: 'fa fa-file',
                                expandCollapseStatus:true
                    
                            },
                            {
                                label: 'Business Process Level2 Setup',
                                routerLink:  ['busproc2SetUp'],
                                faIcon: 'fa fa-file',
                                expandCollapseStatus:true
                    
                            },
                            {
                                label: 'Business Process Level3 Setup',
                                routerLink:  ['busproc3SetUp'],
                                faIcon: 'fa fa-file',
                                expandCollapseStatus:true
                    
                            },
                            {
                                label: 'Business Process Level4 Setup',
                                routerLink:  ['busproc4SetUp'],
                                faIcon: 'fa fa-file',
                                expandCollapseStatus:true
                    
                            },
                        ]
                   
                },

            ]


            
        },
        {
            label: 'CAR Assessment',
            routerLink: ['carAssessment'],
            faIcon: 'fa fa-check',
            expandCollapseStatus:false

            
            

        },
        {
            label: 'Discovery',
            routerLink: ['discovery'],
            faIcon: 'fa fa-search',
            activeIcon: 'fa fa-search',

        },
        {
            label: 'App Survey',
            routerLink: ['appSurvey'],
            faIcon: 'fas fa-check-square',
            activeIcon: 'favorite_border',

        },
        {
            label: 'Assessment',
            routerLink: ['assessment'],
            faIcon: 'fa fa-check',
            activeIcon: 'fa fa-check',

        },
        {
            label: 'Reports',
            faIcon: 'fa fa-sitemap',
            items: [
                {
                    label: 'APR',
                    routerLink:  ['apr'],
                    faIcon: 'fa fa-file',
                    activeIcon: 'fa fa-file',
        
                },
                {
                    label: 'Cloud',
                    routerLink: ['cloud'],
                    faIcon: 'fa fa-file',
                    activeIcon: 'fa fa-file',
                    expand:false
        
                },
                {
                    label: 'Reports',
                    faIcon: 'fa fa-file',
                    items:
                    [
                        {
                            label: 'CRA',
                            routerLink:  ['busproc1SetUp'],
                            faIcon: 'fa fa-file',
                            expandCollapseStatus:true
                
                        },
                        {
                            label: 'APR',
                            routerLink:  ['busproc2SetUp'],
                            faIcon: 'fa fa-file',
                            expandCollapseStatus:true
                
                        },
                        {
                            label: 'Cloud Assist',
                            routerLink:  ['busproc3SetUp'],
                            faIcon: 'fa fa-file',
                            expandCollapseStatus:true
                
                        }
                    ]
        
                },
               
                
            

            ]



        },
       
        
      
    ],

    
    sidebarConfigurations: {
        paddingAtStart: true,
         interfaceWithRoute: true, 
        
         fontColor: `black`,
         color:'grey',
         selectedListFontColor: `rgb(70, 6, 129)`,
         
         collapseOnSelect: true,
       
               
    }

    
};

