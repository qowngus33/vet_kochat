from diagnosis_api import RandomForestDiagnosis
from kochat.app import Scenario

diagnosis = RandomForestDiagnosis()

vomit = Scenario(
    intent='vomit',
    api=diagnosis.request,
    scenario={
        'ANIMAL': [],
        'AREA': [' '],
        'SYMPTOM1': [],
        'SYMPTOM2': ['구토'],
    }
)

skin = Scenario(
    intent='skin',
    api=diagnosis.request,
    scenario={
        'ANIMAL': [],
        'AREA': [],
        'SYMPTOM1': [],
        'SYMPTOM2': ['피부'],
    }
)

eye = Scenario(
    intent='eye',
    api=diagnosis.request,
    scenario={
        'ANIMAL': [],
        'AREA': [' '],
        'SYMPTOM1': [],
        'SYMPTOM2': ['눈'],
    }
)

cough = Scenario(
    intent='cough',
    api=diagnosis.request,
    scenario={
        'ANIMAL': [],
        'AREA': [' '],
        'SYMPTOM1': [],
        'SYMPTOM2': ['기침'],
    }
)

lump = Scenario(
    intent='lump',
    api=diagnosis.request,
    scenario={
        'ANIMAL': [],
        'AREA': [],
        'SYMPTOM1': [' '],
        'SYMPTOM2': ['종괴'],
    }
)

other = Scenario(
    intent='other',
    api=diagnosis.request,
    scenario={
        'ANIMAL': [],
        'AREA': [' '],
        'SYMPTOM1': [' '],
        'SYMPTOM2': [' '],
    }
)
