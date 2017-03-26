'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Property Schema
 */
var PropertySchema = new Schema({
  address: {
    type: String,
    default: 'address',
    required: 'Please fill address',
    trim: true
  },
  county: {
    type: String,
    default: 'county',
    required: 'Please fill county',
    trim: true
  },
  city: {
    type: String,
    default: 'city',
    required: 'Please fill city ',
    trim: true
  },
  phone_no: {
    type: String,
    default: 'phone_no',
    required: false
  },
  CounterOffer: {
    type: String,
    default: '-',
    required: false,
    trim: true
  },   
  Call_PrioritiesArr: {
      red: String,
      green: String,
      blue: String,      
      // default: [],
    required: false
    // required: 'Please fill Call_PrioritiesArr',
    // trim: true
  },  
 Red_Priority_P: {
    type: Boolean,
    default: false,
    required: false,
    // required: 'Please fill CounterOffer',
  },  
Homework_Needed_P: {
    type: Boolean,
    default: false,
    required: false,
    // required: 'Please fill CounterOffer',
  },  
  Distressed_RequireWork_P: {
    type: Boolean,
    default: false,
    required: false,
  }, 
  Research_Needed_P: {
    type: Boolean,
    default: false,
    required: false,
  }, 

 Continue_P: {
    type: Boolean,
    default: 'false',
    required: false,
    //required: 'Please fill CounterOffer',
  },  
 Send_Contract_P: {
    type: Boolean,
    default: false,
    required: false,
    // required: 'Please fill CounterOffer',
  },  

 Later_P: {
    type: Boolean,
    default: 'false',
    required: false,
    // required: 'Please fill CounterOffer',
  },  
 No_Updated_P: {
    type: Boolean,
    default: 'false',
    required: false,
    // required: 'Please fill CounterOffer',
  },  
 Later_Today_P: {
    type: Boolean,
    default: 'false',
    required: false,
    // required: 'Please fill CounterOffer',
  },    
   Left_VM_P: {
    type: Boolean,
    default: 'false',
    required: false,
    // required: 'Please fill CounterOffer',
  },  
   Motivated_Seller_P: {
    type: Boolean,
    default: 'false',
    required: false,
    // required: 'Please fill CounterOffer',
  },  
   Bi_Weekly_P: {
    type: Boolean,
    default: 'false',
    required: false,
    // required: 'Please fill CounterOffer',
  },  
Polite_P: {
    type: Boolean,
    default: 'false',
    required: false,
    // required: 'Please fill CounterOffer',
  }, 
Awesome_Person_P: {
    type: Boolean,
    default: 'false',
    required: false,
    // required: 'Please fill CounterOffer',
  },    
Wrong_NO_P: {
    type: Boolean,
    default: 'false',
    required: false,
    // required: 'Please fill CounterOffer',
  },  

Grey_P: {
    type: Boolean,
    default: 'false',
    required: false,
    // required: 'Please fill CounterOffer',
  },  
Negotiation_Willing_P: {
    type: Boolean,
    default: 'false',
    required: false,
    // required: 'Please fill CounterOffer',
  },  
Counter_P: {
    type: Boolean,
    default: 'false',
    required: false,
    // required: 'Please fill CounterOffer',
  }, 
  cell_phone: {
    type: String,
    default: 'default',
    required: 'Please fill cell_no',
    trim: true
  },  
  email_address: {
    type: String,
    default: 'default',
    required: 'Please fill email_address ',
    trim: true
  }, 
  listPrice: {
    type: String,
    default: 'default',
    required: 'Please fill listPrice ',
    trim: true
  }, 
  offerPrice: {
    type: String,
    default: 'default',
    required: 'Please fill offerPrice ',
    trim: true
  }, 
  agent_name: {
    type: String,
    default: 'default',
    required: 'Please fillin agent_name',     
    trim: true
  },
  user_logged_in: {
    type: String,
    default: 'default',
    required: 'Please fillin user_logged_in',     
    trim: true
  },
  user_logged_email: {
    type: String,
    // default: 'default'
    required : true,    
    unique : true,
    required: 'Please fillin user_logged_emailid',     
    trim: true
  },  
  calls_stack: {
    type: Array,
    default: [],
    required: false,
    trim: true
  },
  FollowUp_Call_Date: {
    type: String,
    default: null,
    required: false
  },
  FollowUp_Call_Date_Obj: {
    type: Date,
    default: null,
    required: false
  },  
  comments: {
    type: String,
    default: '-',
    required: false,
    trim: true
  },  
  homework_notes: {
    type: String,
    default: '-',
    required: false,
    trim: true
  },     
  dateAdded: {
    type: String,
    default: 'default',
    required: 'Please fill dom',
    trim: true
  }, 
  DOM: {
    type: String,
    default: 'default',
    required: 'Please fill dom',
    trim: true
  }, 
  owner: {
    type: String,
    default: 'default',
    required: 'Please fill owner',
    trim: true
  },
  status: {
    type: String,
    default: 'default',
    required: 'Please fill status',
    trim: true
  },  
  last_date_email_sent_on: {
    type: String,
    default: 'default',
    required: 'Please fill last_date_email_sent_on',
    trim: true
  }, 
  dates_email_were_sent_on: {
    type: String,
    default: 'default',
    required: 'Please fill dates_email_were_sent_on',
    trim: true
  }, 
  no_of_emails_sent: {
    type: String,
    default: 'default',
    required: 'Please fill no_of_emails_sent',
    trim: true
  }, 
  last_date_email_open: {
    type: String,
    default: 'default',
    required: 'Please fill last_date_email_open',
    trim: true
  }, 
  no_of_emails_open: {
    type: String,
    default: 'default',
    required: 'Please fill no_of_emails_open',
    trim: true
  },   
  last_date_call_was_made: {
    type: Date,
    default : null,
    required: false,
    trim: true
  }, 
  propertyStatus: {
    type: String,
    default: 'default',
    required: 'please fill propStatus',
    trim: true
  }, 
  agent_State: {
    type: String,
    default: 'default',
    required: 'please fill agent_State',
    trim: true
  },      
  agent_Type: {
    type: String,
    default: 'default',
    required: 'please fill agentStatus',
    trim: true
  },    
  call_priority: {
    type: String,
    default: 'Bi_weekly',
    required: 'Please fill call_priority',
    trim: true
  },      
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Property', PropertySchema);
