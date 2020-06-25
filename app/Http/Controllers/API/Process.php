<?php

namespace App\Http\Controllers\API;

use App\DamageEntry;
use App\DamageScreen;
use App\DamageType;
use App\Http\Controllers\Controller;
use App\Locals;
use App\Road;
use App\States;
use Exception;
use Illuminate\Support\Facades\URL;
use Twilio\Rest\Client;
use Twilio\Jwt\ClientToken;

class Process extends Controller
{
    public $text;
    public $count;
    public $present;
    public $phone;
    public $sessionId;
    public $serviceCode;
    public $screen;
    public $accountSid;
    public $authToken;
    public $appSid;
    public $client;

    public function __construct()
    {
        $this->setter();
    }

    public function index()
    {
        if($this->count < 10 ) {
            echo $this->getOptions();
            die;
        }


    }

    public function storeInput()
    {
        DamageEntry::create([
            'zone_id' =>$this->setStates()[2],
            'state_id'=>$this->setStates()[0],
            'local_id'=>$this->setLocals()[0],
            'road_id'=>$this->setRoads()[0],
            'name' => $this->text[3],
            'phone' => $this->phone,
            'status' => 1,
            'identifier' => rand(111111111, 999999999),
        ]);
        echo $this->end("Thank you for reporting this road to FERMA. We will attend to it immediate.\n Report more.");
        die;
    }

    public function getOptions()
    {
        if($this->count == 1 && $this->present == null)
            return $this->con(DamageScreen::where('order', 0)->first()->value . "\n\n" . DamageType::find($this->count)->name);

        if($this->count == 1 && $this->present == $this->text[0])
            return $this->getStates();

        if($this->count == 2 && $this->present == $this->text[1])
            if($this->setStates()[1] == $this->text[1]){
                echo $this->con("Enter the first letter of your local govt");
            } else {
                echo $this->end("Invalid state selection, please try again");
            }


        if($this->count == 3 && $this->present == $this->text[2])

             echo $this->getLocals($this->setStates()[0]);

        if($this->count == 4 && $this->present == $this->text[3])
            echo $this->getRoads($this->setLocals()[0]);
            // var_dump($this->setLocals());

        if($this->count ==  5 && $this->present == $this->text[4])
            echo $this->con("Would you mind sending us a picture of the bad road ?\n\n 1. Yes\n 2. No");

        if($this->count == 6){
            if($this->text[5] == 1){
                try
                {
                    $url = URL::temporarySignedRoute('upload', now()->addDays(1), ['phone' => '+'.$this->phone]);
                    $this->client->messages->create($this->convert($this->phone),['from' => 'FERMA', 'body' => "Thank you for report this road to ferma. Please visit the link below to upload an image ".$url] );

                    $this->storeInput();
                }
                catch (Exception $e)
                {
                    echo "Error: " . $e->getMessage();
                }

            }
            elseif($this->text[5] == 2){
                $this->storeInput();
            } else {

            }
        }

    }

    public function getStep()
    {
        $this->screen = DamageScreen::where('order', $this->count)->first();
        if(!$this->screen) echo $this->end('Invalid input, please try again');

        return $this->con($this->screen->value);
        die;
    }

    public function getStates(){
        $states = States::where('name', 'LIKE', $this->text[0].'%')->get();
        if(count($states) == 0){
            return $this->end("No states that starts with ".$this->text[0]);
        }
        $res = "Please select your state\n\n";
        foreach($states as $key => $state){
            $key++;
            $res .= $key." ".$state->name."\n";
        }
        return $this->con($res);
    }

    public function setStates(){
        $states = States::where('name', 'LIKE', $this->text[0].'%')->get();

        foreach($states as $key => $state){
            $key++;
            if($key == $this->text[1]){
                $id = $state->state_id;
                return array($id,$key,$state->zone_id);

            }
        }
    }

    public function getLocals($id){
        $locals = Locals::where('local_name', 'LIKE', $this->text[2].'%')->where('state_id','=',$id)->get();
        if(count($locals) == 0){
            return $this->end("No local govt found");
        } else {
            $res = "Please select your local govt\n\n";
            foreach($locals as $key => $local){
                $key++;
                $res .= $key." ".$local->local_name."\n";
            }
            return $this->con($res);
        }

    }

    public function setLocals(){
        $locals = Locals::where('local_name', 'LIKE', $this->text[2].'%')->where('state_id','=',$this->setStates()[0])->get();

        foreach($locals as $key => $local){
             //echo $local;
            $key++;
            if($key == $this->text[3]){
                $state = $local->local_id;
                return array($state,$key);

            }
        }

    }

    public function getRoads($id){
        $roads = Road::where('local_id',$id)->get();
        $res = "Please select the federal road you want to report\n\n";
        foreach($roads as $key => $road){
            $key++;
            $res .= $key." ".$road->name."\n";
        }
        return $this->con($res);
    }

    public function setRoads(){
        $roads = Road::where('local_id',$this->setLocals()[0])->get();

        foreach($roads as $key => $road){
            $key++;
            if($key == $this->text[4]){
                $state = $road->id;
                return array($state,$key);

            }
        }

    }

    public function convert($number){
        $phone =  substr($number, 1);
        return "+234".$phone;
    }

    public function setter()
    {
        $this->sessionId = request()->sessionId;
        $this->serviceCode = request()->serviceCode;
        $this->phone = str_replace('+', '', request()->phoneNumber);
        $this->text = explode("*", request()->text);
        $this->count = count($this->text);
        $this->present = end($this->text);
        $this->accountSid = config('app.twilio')['TWILIO_ACCOUNT_SID'];
        $this->authToken  = config('app.twilio')['TWILIO_AUTH_TOKEN'];
        $this->appSid     = config('app.twilio')['TWILIO_APP_SID'];
        $this->client = new Client($this->accountSid, $this->authToken);

    }

    public function con($message)
    {
        return "CON {$message}";
    }

    public function end($message)
    {
        return "END {$message}";
    }
}
