<?php

namespace App\Http\Controllers\API;

use App\DamageEntry;
use App\DamageScreen;
use App\DamageType;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class Process extends Controller
{
    public $text;
    public $count;
    public $present;
    public $phone;
    public $sessionId;
    public $serviceCode;
    public $screen;

    public function __construct()
    {
        $this->setter();
    }

    public function index()
    {
        if($this->count === 1 && $this->present == null) {

            echo $this->con($this->getOptions());
            die;
        }

        else {
            if($this->count > 0 && $this->present !== null) {
                if($this->count > DamageScreen::max('order')) {
                    $this->storeInput();
                }
                echo $this->getStep();
            }
        }
    }

    public function storeInput()
    {
        DamageEntry::create([
            'location' => $this->text[1],
            'phone' => $this->phone,
            'type' => $this->text[0],
            'status' => 1,
            'identifier' => rand(111111111, 999999999),
        ]);
        echo $this->end('Thank you for notifying us, agents will be dispatched to repair the reported damage');
        die;
    }

    public function getOptions()
    {
        $screens = DamageType::all();

        $response = "Welcome, please select an option.\n";
        foreach ($screens as $key => $value) {
            $step = $key + 1;
            $response = $response . $step . ". " . $value->name . ".\n";
        }
        return $response;
    }

    public function getStep()
    {
        $this->screen = DamageScreen::where('order', $this->count)->first();
        if(!$this->screen) echo $this->end('Invalid input, please try again');

        return $this->con($this->screen->value);
        die;
    }

    public function setter()
    {
        $this->sessionId = request()->sessionId;
        $this->serviceCode = request()->serviceCode;
        $this->phone = str_replace('+', '', request()->phoneNumber);
        $this->text = explode("*", request()->text);
        $this->count = count($this->text);
        $this->present = end($this->text);
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
