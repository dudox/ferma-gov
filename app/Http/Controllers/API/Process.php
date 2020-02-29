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
        if($this->count < 4 ) {
            echo $this->con($this->getOptions());
            die;
        }

        else {
            if($this->count > DamageScreen::max('order')) {
                $this->storeInput();
            }
            echo $this->getStep();

        }
    }

    public function storeInput()
    {
        DamageEntry::create([
            'location' => $this->text[0] . ', ' .$this->text[1] . ', ' . $this->text[2],
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
        if($this->count == 1 && $this->present == null) return DamageScreen::where('order', 0)->first()->value . ".\n\n" . DamageType::find($this->count)->name;;

        return DamageType::find($this->count + 1)->name;
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
