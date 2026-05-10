from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from dotenv import load_dotenv
import os
import jwt
import datetime
import random

app = Flask(__name__)
load_dotenv()

CORS(app)

# =========================
# DATABASE CONFIG
# =========================

app.config["SQLALCHEMY_DATABASE_URI"] = \
    os.getenv("DATABASE_URL")

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

app.config["SECRET_KEY"] = \
    os.getenv("SECRET_KEY")

# =========================
# INITIALIZE
# =========================

db = SQLAlchemy(app)

bcrypt = Bcrypt(app)

# =========================
# DATABASE MODELS
# =========================

class StartupData(db.Model):

    __tablename__ = "startup_data"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    revenue = db.Column(db.Integer)

    users = db.Column(db.Integer)

    burn_rate = db.Column(db.Integer)

    runway = db.Column(db.Float)

    cash = db.Column(db.Integer)

    month = db.Column(db.Integer)

    user_id = db.Column(db.Integer)

    # ADVANCED METRICS

    active_users = db.Column(db.Integer)

    new_users = db.Column(db.Integer)

    churn_rate = db.Column(db.Float)

    retention_rate = db.Column(db.Float)

    conversion_rate = db.Column(db.Float)

    subscription_price = db.Column(db.Integer)

    mrr = db.Column(db.Integer)

    arr = db.Column(db.Integer)

    cac = db.Column(db.Integer)

    ltv = db.Column(db.Integer)

    team_size = db.Column(db.Integer)

    product_quality = db.Column(db.Float)

    investor_confidence = db.Column(db.Float)

    valuation = db.Column(db.BigInteger)

    # NEW SYSTEMS

    customer_satisfaction = db.Column(db.Float)

    market_share = db.Column(db.Float)

    competitor_pressure = db.Column(db.Float)

    growth_rate = db.Column(db.Float)

    risk_score = db.Column(db.Float)

    funding_round = db.Column(db.String(100))
    
    projected_arr = db.Column(db.BigInteger)

    projected_runway = db.Column(db.Float)

    bankruptcy_risk = db.Column(db.Float)

    pricing_strategy = db.Column(db.String(100))

    investor_readiness = db.Column(db.Float)


class User(db.Model):

    __tablename__ = "users"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    username = db.Column(
        db.String(100)
    )

    email = db.Column(
        db.String(100)
    )

    password = db.Column(
        db.String(255)
    )

# =========================
# HOME ROUTE
# =========================

@app.route("/")
def home():

    return jsonify({
        "message": "Backend Running"
    })

# =========================
# GET STARTUP DATA
# =========================

@app.route("/startup", methods=["GET"])
def get_startup():

    user_id = request.args.get("user_id")

    data = StartupData.query.filter_by(
        user_id=user_id
    ).first()

    if not data:

        return jsonify({
            "message": "No startup data found"
        }), 404

    # STARTUP STAGE

    startup_stage = "Early Stage"

    if data.valuation > 5000000:
        startup_stage = "Seed"

    if data.valuation > 20000000:
        startup_stage = "Series A"

    if data.valuation > 80000000:
        startup_stage = "Series B"

    if data.valuation > 100000000:
        startup_stage = "Unicorn"

    return jsonify({

        "revenue":
            data.revenue,

        "users":
            data.users,

        "burnRate":
            data.burn_rate,

        "runway":
            data.runway,

        "cash":
            data.cash,

        "month":
            data.month,

        "activeUsers":
            data.active_users,

        "newUsers":
            data.new_users,

        "churnRate":
            data.churn_rate,

        "retentionRate":
            data.retention_rate,

        "conversionRate":
            data.conversion_rate,

        "subscriptionPrice":
            data.subscription_price,

        "mrr":
            data.mrr,

        "arr":
            data.arr,

        "cac":
            data.cac,

        "ltv":
            data.ltv,

        "teamSize":
            data.team_size,

        "productQuality":
            data.product_quality,

        "investorConfidence":
            data.investor_confidence,

        "valuation":
            data.valuation,

        "startupStage":
            startup_stage,

        # NEW METRICS

        "customerSatisfaction":
            data.customer_satisfaction,

        "marketShare":
            data.market_share,

        "competitorPressure":
            data.competitor_pressure,

        "growthRate":
            data.growth_rate,

        "riskScore":
            data.risk_score,

        "fundingRound":
            data.funding_round,
            
        "projectedARR":
            data.projected_arr,

        "projectedRunway":
            data.projected_runway,

        "bankruptcyRisk":
            data.bankruptcy_risk,

        "pricingStrategy":
            data.pricing_strategy,

        "investorReadiness":
            data.investor_readiness  
    })

# =========================
# UPDATE STARTUP
# =========================

@app.route("/startup/update", methods=["POST"])
def update_startup():

    data = request.json

    startup = StartupData.query.filter_by(
        user_id=data["user_id"]
    ).first()

    if not startup:

        return jsonify({
            "message": "Startup not found"
        }), 404

    startup.revenue = data["revenue"]

    startup.users = data["users"]

    startup.burn_rate = data["burnRate"]

    startup.runway = data["runway"]

    startup.cash = data["cash"]

    startup.month = data["month"]

    db.session.commit()

    return jsonify({
        "message": "Startup updated"
    })

# =========================
# SIMULATION ENGINE
# =========================

@app.route("/simulate-month", methods=["POST"])
def simulate_month():

    data = request.json

    startup = StartupData.query.filter_by(
        user_id=data["user_id"]
    ).first()

    if not startup:

        return jsonify({
            "message": "Startup not found"
        }), 404

    # =========================
    # USER GROWTH ENGINE
    # =========================

    marketing_boost = data.get(
        "marketing_boost",
        1
    )

    quality_multiplier = (
        startup.product_quality / 100
    )

    new_users = int(

        startup.new_users *

        marketing_boost *

        quality_multiplier
    )

    # =========================
    # CHURN ENGINE
    # =========================

    churned_users = int(

        startup.active_users *

        startup.churn_rate
    )

    # =========================
    # ACTIVE USERS
    # =========================

    startup.active_users = max(

        0,

        startup.active_users +

        new_users -

        churned_users
    )

    startup.users += new_users

    # =========================
    # REVENUE ENGINE
    # =========================

    paid_users = int(

        startup.active_users *

        startup.conversion_rate
    )

    startup.mrr = int(

        paid_users *

        startup.subscription_price
    )

    startup.arr = startup.mrr * 12

    startup.revenue += startup.mrr

    # =========================
    # LTV ENGINE
    # =========================

    if startup.churn_rate > 0:

        startup.ltv = int(

            startup.subscription_price /

            startup.churn_rate
        )

    # =========================
    # BURN ENGINE
    # =========================

    salary_cost = (
        startup.team_size * 4000
    )

    infrastructure_cost = int(
        startup.active_users * 0.4
    )

    startup.burn_rate = int(

        salary_cost +

        infrastructure_cost
    )

    # =========================
    # CASH FLOW
    # =========================

    startup.cash += (

        startup.mrr -

        startup.burn_rate
    )

    # =========================
    # RUNWAY
    # =========================

    if startup.burn_rate > 0:

        startup.runway = round(

            startup.cash /

            startup.burn_rate,

            1
        )

    # =========================
    # VALUATION ENGINE
    # =========================

    growth_multiplier = 8

    startup.valuation = int(

        startup.arr *

        growth_multiplier
    )

    # =========================
    # INVESTOR CONFIDENCE
    # =========================

    confidence = 50

    if startup.mrr > 100000:
        confidence += 10

    if startup.churn_rate < 0.04:
        confidence += 10

    if startup.runway > 12:
        confidence += 10

    if startup.product_quality > 80:
        confidence += 10

    startup.investor_confidence = min(
        confidence,
        100
    )

    # =========================
    # PRODUCT QUALITY
    # =========================

    startup.product_quality += (
        startup.team_size * 0.2
    )

    startup.product_quality = min(
        startup.product_quality,
        100
    )

    # =========================
    # MARKET PRESSURE ENGINE
    # =========================

    startup.competitor_pressure += 0.5

    # CUSTOMER SATISFACTION

    startup.customer_satisfaction += (
        startup.product_quality * 0.02
    )

    startup.customer_satisfaction -= (
        startup.competitor_pressure * 0.03
    )

    startup.customer_satisfaction = max(
        0,
        min(startup.customer_satisfaction, 100)
    )

    # DYNAMIC CHURN

    startup.churn_rate = max(

        0.01,

        0.08 -

        (startup.customer_satisfaction / 200)
    )

    # GROWTH RATE

    startup.growth_rate = (

        (
            new_users /

            max(startup.active_users, 1)
        ) * 100
    )

    # MARKET SHARE

    startup.market_share += (
        startup.growth_rate * 0.02
    )

    startup.market_share = min(
        startup.market_share,
        100
    )

    # RISK SCORE

    risk = 20

    if startup.runway < 6:
        risk += 20

    if startup.churn_rate > 0.06:
        risk += 20

    if startup.cash < 50000:
        risk += 20

    if startup.competitor_pressure > 60:
        risk += 15

    startup.risk_score = min(
        risk,
        100
    )

    # FUNDING ROUND

    if startup.valuation > 5000000:
        startup.funding_round = "Seed"

    if startup.valuation > 20000000:
        startup.funding_round = "Series A"

    if startup.valuation > 80000000:
        startup.funding_round = "Series B"

    # =========================
# FORECASTING ENGINE
# =========================

# PROJECTED ARR

    startup.projected_arr = int(

    startup.arr *

    (1 + (startup.growth_rate / 100)) ** 12
)

# PROJECTED RUNWAY

    startup.projected_runway = round(

    startup.cash /

    max(startup.burn_rate, 1),

    1
)

# BANKRUPTCY RISK

    risk = 10

    if startup.runway < 6:
        risk += 25

    if startup.cash < 30000:
        risk += 20

    if startup.churn_rate > 0.07:
        risk += 15

    if startup.competitor_pressure > 70:
        risk += 15

    if startup.growth_rate < 2:
        risk += 15

    startup.bankruptcy_risk = min(
    risk,
    100
)

# INVESTOR READINESS

    readiness = 40

    if startup.arr > 1000000:
        readiness += 15

    if startup.growth_rate > 10:
        readiness += 15

    if startup.churn_rate < 0.05:
        readiness += 10

    if startup.runway > 12:
        readiness += 10

    if startup.product_quality > 80:
        readiness += 10

    startup.investor_readiness = min(
    readiness,
    100
)
    # =========================
    # RANDOM EVENTS
    # =========================

    events = [

        {
            "name": "Product went viral",
            "effect": "growth"
        },

        {
            "name": "Major server outage",
            "effect": "negative"
        },

        {
            "name": "Investor interest increased",
            "effect": "funding"
        },

        {
            "name": "Competitor launched new feature",
            "effect": "competition"
        }
    ]

    selected_event = random.choice(events)

    event_message = selected_event["name"]

    if selected_event["effect"] == "growth":

        startup.new_users += 500

        startup.market_share += 1

    if selected_event["effect"] == "negative":

        startup.customer_satisfaction -= 10

        startup.churn_rate += 0.02

    if selected_event["effect"] == "funding":

        startup.investor_confidence += 10

        startup.valuation += 1000000

    if selected_event["effect"] == "competition":

        startup.competitor_pressure += 10

    # =========================
    # FAILURE CONDITIONS
    # =========================

    game_over = False

    failure_reason = ""

    if startup.cash <= 0:

        game_over = True

        failure_reason = \
            "Startup went bankrupt."

    if startup.runway <= 0:

        game_over = True

        failure_reason = \
            "Runway exhausted."

    # =========================
    # SUCCESS CONDITION
    # =========================

    success = False

    if startup.valuation >= 100000000:

        success = True

    # =========================
    # MONTH UPDATE
    # =========================

    startup.month += 1

    db.session.commit()

    return jsonify({

        "message":
            "Month simulated",

        "activeUsers":
            startup.active_users,

        "newUsers":
            new_users,

        "mrr":
            startup.mrr,

        "arr":
            startup.arr,

        "burnRate":
            startup.burn_rate,

        "cash":
            startup.cash,

        "runway":
            startup.runway,

        "valuation":
            startup.valuation,

        "investorConfidence":
            startup.investor_confidence,

        "productQuality":
            startup.product_quality,

        "customerSatisfaction":
            startup.customer_satisfaction,

        "marketShare":
            startup.market_share,

        "competitorPressure":
            startup.competitor_pressure,

        "growthRate":
            startup.growth_rate,

        "riskScore":
            startup.risk_score,

        "fundingRound":
            startup.funding_round,

        "eventMessage":
            event_message,

        "gameOver":
            game_over,

        "failureReason":
            failure_reason,

        "success":
            success
    })

# =========================
# HIRE EMPLOYEE
# =========================

@app.route("/hire-employee", methods=["POST"])
def hire_employee():

    data = request.json

    startup = StartupData.query.filter_by(
        user_id=data["user_id"]
    ).first()

    if not startup:

        return jsonify({
            "message": "Startup not found"
        }), 404

    role = data["role"]

    # ENGINEER

    if role == "engineer":

        startup.team_size += 1

        startup.product_quality += 3

        startup.burn_rate += 5000

    # MARKETER

    elif role == "marketer":

        startup.team_size += 1

        startup.new_users += 300

        startup.cac += 2

        startup.burn_rate += 4500

    # SALES

    elif role == "sales":

        startup.team_size += 1

        startup.conversion_rate += 0.01

        startup.burn_rate += 5500

    # DESIGNER

    elif role == "designer":

        startup.team_size += 1

        startup.retention_rate += 0.02

        startup.churn_rate -= 0.01

        startup.burn_rate += 4000

    startup.product_quality = min(
        startup.product_quality,
        100
    )

    startup.retention_rate = min(
        startup.retention_rate,
        1
    )

    startup.churn_rate = max(
        startup.churn_rate,
        0.01
    )

    db.session.commit()

    return jsonify({
        "message": f"{role} hired successfully"
    })
    
    # =========================
# UPDATE PRICING
# =========================

@app.route("/update-pricing", methods=["POST"])
def update_pricing():

    data = request.json

    startup = StartupData.query.filter_by(
        user_id=data["user_id"]
    ).first()

    if not startup:

        return jsonify({
            "message": "Startup not found"
        }), 404

    startup.pricing_strategy = data["strategy"]

    startup.subscription_price = data["price"]

    # PRICING EFFECTS

    if data["strategy"] == "Budget":

        startup.conversion_rate += 0.02

        startup.churn_rate += 0.01

    elif data["strategy"] == "Premium":

        startup.conversion_rate -= 0.01

        startup.churn_rate -= 0.02

        startup.product_quality += 2

    db.session.commit()

    return jsonify({
        "message": "Pricing updated"
    })

# =========================
# REGISTER
# =========================

@app.route("/register", methods=["POST"])
def register():

    data = request.json

    existing_user = User.query.filter_by(
        email=data["email"]
    ).first()

    if existing_user:

        return jsonify({
            "message": "User already exists"
        }), 400

    hashed_password = bcrypt.generate_password_hash(
        data["password"]
    ).decode("utf-8")

    user = User(

        username=data["username"],

        email=data["email"],

        password=hashed_password
    )

    db.session.add(user)

    db.session.commit()

    # DEFAULT STARTUP

    startup = StartupData (

        revenue=48000,

        users=12000,

        burn_rate=9000,

        runway=14,

        cash=150000,

        month=1,

        user_id=user.id,

        active_users=8500,

        new_users=1200,

        churn_rate=0.05,

        retention_rate=0.95,

        conversion_rate=0.08,

        subscription_price=20,

        mrr=68000,

        arr=816000,

        cac=14,

        ltv=400,

        team_size=6,

        product_quality=72,

        investor_confidence=58,

        valuation=1200000,

        customer_satisfaction=78,

        market_share=2.5,

        competitor_pressure=25,

        growth_rate=12,

        risk_score=30,

        funding_round="Pre-Seed",
        
        projected_arr=1200000,

        projected_runway=14,

        bankruptcy_risk=20,

        pricing_strategy="Standard",

        investor_readiness=55 
        ) 

    db.session.add(startup)

    db.session.commit()

    return jsonify({
        "message":
            "User registered successfully"
    })

# =========================
# LOGIN
# =========================

@app.route("/login", methods=["POST"])
def login():

    data = request.json

    user = User.query.filter_by(
        email=data["email"]
    ).first()

    if not user:

        return jsonify({
            "message": "User not found"
        }), 404

    valid_password = bcrypt.check_password_hash(
        user.password,
        data["password"]
    )

    if not valid_password:

        return jsonify({
            "message": "Invalid password"
        }), 401

    token = jwt.encode(

        {
            "user_id": user.id,

            "exp":
                datetime.datetime.utcnow()
                + datetime.timedelta(hours=24)
        },

        app.config["SECRET_KEY"],

        algorithm="HS256"
    )

    return jsonify({

        "message":
            "Login successful",

        "token":
            token,

        "username":
            user.username,

        "user_id":
            user.id
    })

# =========================
# RUN SERVER
# =========================

if __name__ == "__main__":

    app.run(debug=True)