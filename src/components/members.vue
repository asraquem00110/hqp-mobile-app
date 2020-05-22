<template>
        <ion-content style="height: 250px;width:100%;">
            <ion-card>
                <div style="text-align:center;margin-top:20px;" v-if="members.length <= 0">
                <span style="color:maroon;font-weight:bold">No Available Data</span>
                </div>
                <ion-list>
                    <ion-item v-for="(member,index) in members" :key="index">
                        <ion-row>
                            <ion-col size="5">
                                 <!-- <img v-if="member.img != null && member.img && member.img != ''" style="height:100%;width:100%" :src="`https://hqp-backend-00110.herokuapp.com/public/images/families/${member.img}`"/> -->
                                   <img v-if="member.img != null && member.img && member.img != ''" style="height:100%;width:100%" :src="`https://00110xd.000webhostapp.com/hqPublic/uploads/${member.img}`"/>
                                <img v-else style="height:100%;width:100%" :src="`https://hqp-backend-00110.herokuapp.com/public/images/default.png`"/>
                            </ion-col>
                            <ion-col style="padding:15px;">
                                    <div style="width:100%;background:dimgray;color:white;padding:3px;text-align:center;border-radius:10px;margin-bottom:3px;">
                                    <span>Informations</span>
                                    </div>

                                    <small><strong>Name:</strong> {{member.fname}}</small><br/>
                                    <small><strong>Gender:</strong> {{member.gender}}</small><br/>
                                    <small><strong>Age:</strong> {{getAge(member.Bday)}}</small>

                            </ion-col>
                        </ion-row>
                    </ion-item>
                </ion-list> 
            </ion-card>
        </ion-content>
</template>

<script>
import {calculateAge} from "@/helper/helper"
export default {
    name: 'members',
    props: {
        members: {
            type: Array,
            required: true,
        }
    },
    methods: {
        getAge: function(bday){
            return calculateAge(bday)
        }
    }
}
</script>
