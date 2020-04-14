<template>
    <div class="ion-page">
        <ion-header>
            <ion-toolbar class="toolbar-background">
                <ion-title>HQP CHECKER</ion-title><img src="@/assets/mylogo.png" style="width:70px;height:50px;position:absolute;right:3px;top:3px;"/>
            </ion-toolbar>
        </ion-header>
        <ion-content>
             <!-- <ion-refresher slot="fixed" pull-factor="0.5" pull-min="100" pull-max="200" @ionRefresh="doRefresh($event)"> -->
             <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
                 <ion-refresher-content
                    pulling-icon="arrow-dropdown"
                    pulling-text="Pull to refresh"
                    refreshing-spinner="circles"
                    refreshing-text="">
                </ion-refresher-content>
            </ion-refresher>
           <ion-grid>
                <ion-row>
                    <ion-col>
                  

                        <ion-card>
                            <ion-card-header>
                            <ion-card-title>
                                <ion-row>
                                <ion-col>
                                <span style="font-size: 10pt;font-weight:bold;">PASS INFORMATION</span>
                                </ion-col>
                                 <ion-col style="text-align:right;">
                                    
                                     <span v-if="scan.checked && status" :style="scan.valid">Valid &#10004;</span>
                                     <span v-else-if="!scan.checked && status" :style="scan.invalid">InValid &#10008;</span>
                                   
                                </ion-col>
                                </ion-row>
                                </ion-card-title>
                            </ion-card-header>

                            <ion-card-content>

                                    <ion-row>
                                        <ion-col size="5">
                                           HouseHold No:
                                        </ion-col>
                                        <ion-col size="7">
                                           {{household.no}}

                                        </ion-col>
                                          <ion-col size="5">
                                           Family Name:
                                        </ion-col>
                                        <ion-col size="7">
                                           {{household.family}}

                                        </ion-col>
                                          <ion-col size="5">
                                            Address:
                                        </ion-col>
                                        <ion-col size="7">
                                             {{household.address}}

                                        </ion-col>
                                          <ion-col size="5">
                                              Barangay:
                                        </ion-col>
                                        <ion-col size="7">
                                              {{household.barangay}}

                                        </ion-col>
                                    </ion-row>


                            </ion-card-content>
                        </ion-card>
                        <ion-text>
                            <small class="ion-padding" style="color:#10362B !important;font-weight:bold;">Household Members *</small>
                        </ion-text>
                        <members :members.sync="household.members"></members>
                    </ion-col>
                    
                </ion-row>
                
           </ion-grid>
                    <div class="ion-padding" style="">
                            <ion-button expand="block" @click="scanQr()" size="medium" style="--background: #10362B;--border-radius:20px;" type="button" class="ion-no-margin"><span style="font-size: 12pt;">SCAN QRCODE</span></ion-button>
                        </div>
        </ion-content>

       
    </div>
</template>

<script>
import members from "@/components/members"
import axios from 'axios'
export default {
    data: function(){
        return {
            status: false,
            household: {
                no: '',
                family: '',
                address: '',
                barangay: '',
                members: [],
            },
            scan:{
                action: false,
                checked: false,
                invalid: {
                    'font-size': '10pt',
                    'font-weight':'bold',
                    'color':'white',
                    'background':'maroon',
                    'padding': '5px 10px',
                    'border-radius': '20px',
                },
                valid: {
                    'font-size': '10pt',
                    'font-weight':'bold',
                    'color':'white',
                    'background':'green',
                    'padding': '5px 10px',
                    'border-radius': '20px',
                }
            }


        }
    },
    methods: {
        doRefresh: async function(event){
   
            setTimeout(() => {
                for(let property in this.household){
                if(property=="members"){
                        this.household[property] = []
                    }else{
                        this.household[property] = ""
                    }
                }
                this.status = false
                event.target.complete();
            }, 500);
        },
        scanQr:  function(){
                           var app = this
                            window.cordova.plugins.barcodeScanner.scan(
                                    function(result) {
                                        // result.text
                                        // result.format
                                        // result.cancelled
                                
                                        if(result.cancelled == false || result.cancelled == "false"){
                                            app.getInfo(result.text.trim())
                                                .then((res)=>{
                                                    app.status = true
                                                    if(res.data.data.length > 0){
                                                        app.scan.checked = true
                                                        app.household.no = res.data.data[0].Address.householdNo
                                                        app.household.family = res.data.data[0].family
                                                        app.household.address = `${res.data.data[0].Address.address} , ${res.data.data[0].Address.Street.street}`
                                                        app.household.barangay = res.data.data[0].Address.Barangay.barangay
                                                        app.household.members = res.data.data[0].Members
                                                    }else{
                                                        for(let property in app.household){
                                                            if(property == "members"){
                                                                app.household[property] = []
                                                            }else{
                                                                app.household[property] = "N/A"
                                                            }
                                                        }
                                                        app.scan.checked = false
                                                    }
                                                   
                                                })
                                                .catch((err)=>{
                                                    alert(err)
                                                })

                                        }
                                        
                                    },
                                    function(error) {
                                     alert("Scanning failed: " + error);
                                    },
                                    {
                                        preferFrontCamera: false, // iOS and Android
                                        showFlipCameraButton: true, // iOS and Android
                                        showTorchButton: true, // iOS and Android
                                        torchOn: false, // Android, launch with the torch switched on (if available)
                                        saveHistory: true, // Android, save scan history (default false)
                                        prompt: "Place a barcode inside the scan area", // Android
                                        resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
                                        formats: "QR_CODE,PDF_417,CODE_128", // default: all but PDF_417 and RSS_EXPANDED
                                        orientation: "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
                                        disableAnimations: true, // iOS
                                        disableSuccessBeep: false // iOS and Android
                                    }
                                );
        },

        getInfo: function(qrcodeString){
            return new Promise((resolve,reject)=>{
                axios.post("https://hqp-backend-00110.herokuapp.com/api/mobile/getQrCodeInformation",{qrcode: qrcodeString}).then((res)=>{
                    resolve(res)
                }).catch((err)=>{
                    reject(err)
                })
            })
        }


    },
    components: {
        members
    }
}
</script>

<style scoped>
ion-title {
   font-weight: bold;
   font-size: 12pt;
}

ion-toolbar {
     --background: #10362B;
     --color: white;
}
</style>