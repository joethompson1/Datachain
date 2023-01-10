package chaincode

import (
	"encoding/json"
	"fmt"
	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

// SmartContract provides functions for managing an Asset
type SmartContract struct {
	contractapi.Contract
}

// Asset describes basic details of what makes up a simple asset
type Asset struct {
	OwnerID        string `json:"ownerID"`
	DegreeType     string `json:"degreeType"`
	Subject        string `json:"subject"`
	Classification string `json:"classification"`
	Accreditor     string `json:"accreditor"`
	Date           string `json: date`
}

// InitLedger adds a base set of assets to the ledger
func (s *SmartContract) InitLedger(ctx contractapi.TransactionContextInterface) error {
	assets := []Asset{
		{OwnerID: "01", DegreeType: "BSc", Subject: "Computer Science & Business Management", Classification: "1st", Accreditor: "The University of Manchester"},
	}

	for _, asset := range assets {
		assetJSON, err := json.Marshal(asset)
		if err != nil {
			return err
		}

		err = ctx.GetStub().PutState(asset.OwnerID, assetJSON)
		if err != nil {
			return fmt.Errorf("failed to put to world state. %v", err)
		}
	}

	return nil
}

// CreateAsset issues a new asset to the world state with given details.
func (s *SmartContract) CreateAsset(ctx contractapi.TransactionContextInterface, ownerID string, degree_type string, subject string, classification string, accreditor string, date string) error {
	exists, err := s.AssetExists(ctx, ownerID)
	if err != nil {
		return err
	}
	if exists {
		return fmt.Errorf("the asset %s already exists", ownerID)
	}

	asset := Asset{
		OwnerID:        ownerID,
		DegreeType:     degree_type,
		Subject:        subject,
		Classification: classification,
		Accreditor:     accreditor,
		Date:           date,
	}
	assetJSON, err := json.Marshal(asset)
	if err != nil {
		return err
	}

	return ctx.GetStub().PutState(ownerID, assetJSON)
}

// ReadAsset returns the asset stored in the world state with given id.
func (s *SmartContract) ReadAsset(ctx contractapi.TransactionContextInterface, ownerID string) (*Asset, error) {
	assetJSON, err := ctx.GetStub().GetState(ownerID)
	if err != nil {
		return nil, fmt.Errorf("failed to read from world state: %v", err)
	}
	if assetJSON == nil {
		return nil, fmt.Errorf("the asset %s does not exist", ownerID)
	}

	var asset Asset
	err = json.Unmarshal(assetJSON, &asset)
	if err != nil {
		return nil, err
	}

	return &asset, nil
}

// UpdateAsset updates an existing asset in the world state with provided parameters.
func (s *SmartContract) UpdateAsset(ctx contractapi.TransactionContextInterface, ownerID string, degree_type string, subject string, classification string, accreditor string, date string) error {
	exists, err := s.AssetExists(ctx, ownerID)
	if err != nil {
		return err
	}
	if !exists {
		return fmt.Errorf("the asset %s does not exist", ownerID)
	}

	// overwriting original asset with new asset
	asset := Asset{
		OwnerID:        ownerID,
		DegreeType:     degree_type,
		Subject:        subject,
		Classification: classification,
		Accreditor:     accreditor,
		Date:           date,
	}

	assetJSON, err := json.Marshal(asset)
	if err != nil {
		return err
	}

	return ctx.GetStub().PutState(ownerID, assetJSON)
}

// DeleteAsset deletes an given asset from the world state.
func (s *SmartContract) DeleteAsset(ctx contractapi.TransactionContextInterface, ownerID string) error {
	exists, err := s.AssetExists(ctx, ownerID)
	if err != nil {
		return err
	}
	if !exists {
		return fmt.Errorf("the asset %s does not exist", ownerID)
	}

	return ctx.GetStub().DelState(ownerID)
}

// AssetExists returns true when asset with given ID exists in world state
func (s *SmartContract) AssetExists(ctx contractapi.TransactionContextInterface, ownerID string) (bool, error) {
	assetJSON, err := ctx.GetStub().GetState(ownerID)
	if err != nil {
		return false, fmt.Errorf("failed to read from world state: %v", err)
	}

	return assetJSON != nil, nil
}



// GetAllAssets returns all assets found in world state
func (s *SmartContract) GetAllAssets(ctx contractapi.TransactionContextInterface) ([]*Asset, error) {
	// range query with empty string for startKey and endKey does an
	// open-ended query of all assets in the chaincode namespace.
	resultsIterator, err := ctx.GetStub().GetStateByRange("", "")
	if err != nil {
		return nil, err
	}
	defer resultsIterator.Close()

	var assets []*Asset
	for resultsIterator.HasNext() {
		queryResponse, err := resultsIterator.Next()
		if err != nil {
			return nil, err
		}

		var asset Asset
		err = json.Unmarshal(queryResponse.Value, &asset)
		if err != nil {
			return nil, err
		}
		assets = append(assets, &asset)
	}

	return assets, nil
}
